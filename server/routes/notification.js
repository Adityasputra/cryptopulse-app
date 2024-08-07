const NotificationController = require("../controllers/notificationController");
const router = require("express").Router();

router.post("/", NotificationController.createNotification);
router.get("/", NotificationController.getAllNotifications);
router.get("/:id", NotificationController.getNotificationById);
router.put("/:id", NotificationController.updateNotification);
router.delete("/:id", NotificationController.deleteNotification);

module.exports = router;
