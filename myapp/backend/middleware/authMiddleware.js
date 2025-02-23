const adminOnly = (req, res, next) => {
  if (!req.session.user || !req.session.user.isAdmin) {
    return res.status(403).json({ message: "Access denied. Admin only." });
  }
  next();
};

export default adminOnly;
