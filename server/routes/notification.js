const router = require("express").Router();
const NotificationController = require("../controllers/notificationController");
const auth = require("../middlewares/authentication");

router.post("/notifications", auth, NotificationController.createNotification);
router.get("/notifications", auth, NotificationController.getAllNotifications);
router.get(
  "/notifications/:id",
  auth,
  NotificationController.getNotificationById
);
router.put(
  "/notifications/:id",
  auth,
  NotificationController.updateNotification
);
router.delete(
  "/notifications/:id",
  auth,
  NotificationController.deleteNotification
);

module.exports = router;
