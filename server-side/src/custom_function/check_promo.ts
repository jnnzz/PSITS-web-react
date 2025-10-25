import { Promo } from "../models/promo.model";
import { Orders } from "../models/orders.model";

export const checkPromos = async () => {
  try {
    const current = new Date();

    const invalidPromos = await Promo.find({
      $or: [{ start_date: { $gt: current } }, { end_date: { $lt: current } }],
    });

    if (!invalidPromos.length) {
      console.log("No invalid promos found.");
      return [];
    }

    const invalidPromoIds = invalidPromos.map((p) => p._id);

    const result = await Orders.deleteMany({
      "promo._id": { $in: invalidPromoIds },
    });

    console.log(
      ` Removed ${result.deletedCount} orders referencing invalid promos.`
    );

    return {
      invalidPromos,
      deletedOrders: result.deletedCount,
    };
  } catch (error) {
    console.error("Error checking/removing promos in orders:", error);
    throw error;
  }
};
