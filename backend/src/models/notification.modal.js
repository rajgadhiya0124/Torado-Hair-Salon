import db from "../config/db.js";


export const notificationModel = {

    createNotification: async (data) => {
        const { title, message, type, reference_id,createdBy } = data;

        await db.query(
            "CALL sp_create_notification(?,?,?,?,?)",
            [title, message, type, reference_id,createdBy]
        );
    },

    getNotifications: async () => {
        const [result] = await db.query("CALL sp_get_notifications()");
        return result[0];
    },

    markAsRead: async (id) => {
        await db.query("CALL sp_mark_notification_read(?)", [id]);
    }
}