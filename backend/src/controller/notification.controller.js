import { notificationModel } from "../models/notification.modal.js";

// Create Notification
export const createNotification = async (req, res) => {
    try {

        await notificationModel.createNotification(req.body);

        res.status(200).json({
            success: true,
            message: "Notification created"
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// Get Notifications
export const getNotifications = async (req, res) => {
    try {
        const data = await notificationModel.getNotifications();

        res.status(200).json({
            success: true,
            data
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// Mark as Read
export const markAsRead = async (req, res) => {
    try {
        await notificationModel.markAsRead(req.params.id);

        res.status(200).json({
            success: true,
            message: "Marked as read"
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};
