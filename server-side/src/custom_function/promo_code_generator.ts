export const promoCodeGenerator = (promo_name: String) => {
  try {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

    let result = promo_name.toUpperCase() + "-";
    for (let i = 0; i < 8; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      result += characters[randomIndex];
    }
    return result;
  } catch (error) {
    console.error(error);
  }
};
