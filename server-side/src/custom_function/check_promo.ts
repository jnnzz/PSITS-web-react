import { Promo } from "../models/promo.model";
import { Orders } from "../models/orders.model";
import { PromoLog } from "../models/promo.log.model";

export const checkPromos = async () => {
  try {
    const current = new Date();

    const invalidPromos = await Promo.find({
      $or: [{ start_date: { $gt: current } }, { end_date: { $lt: current } }],
    });

    if (!invalidPromos.length) {
      console.log("✅ No invalid promos found.");
      await PromoLog.create({ description: "No invalid promos found." });
      return;
    }

    for (const promo of invalidPromos) {
      const relatedOrders = await Orders.find({
        "promo._id": promo._id,
        order_status: "Pending",
      });

      if (relatedOrders.length > 0) {
        const result = await Orders.deleteMany({
          "promo._id": promo._id,
          order_status: "Pending",
        });

        const newQuantity = promo.quantity + result.deletedCount;

        await Promo.findByIdAndUpdate(promo._id, {
          $set: { quantity: newQuantity },
        });

        const message = `🗑️ Deleted ${result.deletedCount} pending orders using expired promo "${promo.promo_name}". ♻️ Restocked to quantity: ${newQuantity}`;
        console.log(message);

        await PromoLog.create({ description: message });
      } else {
        const message = `⚠️ No pending orders found using promo "${promo.promo_name}".`;
        console.log(message);

        await PromoLog.create({ description: message });
      }
    }

    console.log("🎯 Promo check and restock completed.");
    await PromoLog.create({
      description: "Promo check and restock completed.",
    });
  } catch (error) {
    console.error("❌ Error during promo cleanup:", error);
    await PromoLog.create({
      description: `Error during promo cleanup: ${error}`,
    });
  }
};
