package repository

import (
	"context"
	"log"
	"trip-cast/domain"

	"github.com/jackc/pgx/v4/pgxpool"
)

type notificationRepository struct {
	db *pgxpool.Pool
}

func NewNotificationRepository(db *pgxpool.Pool) domain.NotificationRepository {
	return &notificationRepository{
		db: db,
	}
}

const (
	queryFetchNotifications = `
	SELECT
		n.notification_id,
		n.content,
		n.trip_id,
		n.user_id,
		n.is_read,
		n.created_at
	FROM
		notifications n
	JOIN
		trips t
	ON
		n.trip_id = t.trip_id
	WHERE
		n.user_id = $1;
	`

	queryDeleteNotification = `
	DELETE FROM
		notifications
	WHERE
		notification_id = $1;
	`

	queryUpdateNotification = `
	UPDATE
		notifications
	SET
		is_read = true
	WHERE
		notification_id = $1;
	`
)

func (r *notificationRepository) List(ctx context.Context, userID uint64) ([]domain.Notifications, error) {

	var (
		notificationDAO domain.NotificationDAO
		notification    domain.Notifications
		notifications   []domain.Notifications
	)
	rows, err := r.db.Query(ctx, queryFetchNotifications, userID)
	if err != nil {
		log.Printf("error while listing notification:%s",err.Error())
		return nil, err
	}
	defer rows.Close()

	for rows.Next() {
		err := rows.Scan(
			&notificationDAO.NotificationID,
			&notificationDAO.Content,
			&notificationDAO.TripID,
			&notificationDAO.UserID,
			&notificationDAO.IsRead,
			&notificationDAO.CreatedAt,
		)
		if err != nil {
					log.Printf("error while scaning rows in listing notification:%s",err.Error())
			return nil, err
		}
		notificationDAO.MapToDomain(&notification)
		notifications = append(notifications, notification)
	}

	return notifications, nil
}


func (r *notificationRepository) DeleteNotification(ctx context.Context, notificationID uint64) error {
	_, err := r.db.Exec(ctx, queryDeleteNotification, notificationID)
	if err != nil {
		return err
	}
	return nil
}

func (r *notificationRepository) UpdateNotifications(ctx context.Context, notificationID uint64) error {
	_, err := r.db.Exec(ctx, queryUpdateNotification, notificationID)
	if err != nil {
		return err
	}
	return nil
}