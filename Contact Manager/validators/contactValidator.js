export const validateContact = ({ name, email, phone }) => {
    if (!name || !email || !phone) return false;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
  