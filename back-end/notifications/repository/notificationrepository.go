package repository

import (
	"context"
	"fmt"
	"log"
	"strings"
	"time"
	"trip-cast/domain"
	"trip-cast/internal/utils"

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
		n.created_at,
		n.weather_change
	FROM
		notifications n
	JOIN
		trips t
	ON
		n.trip_id = t.trip_id
	WHERE
		n.user_id = $1 and end_date::DATE >= NOW()::DATE;
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

	queryInsertNotification = `
	INSERT INTO
		notifications (%s)
	VALUES %s
	ON CONFLICT(user_id,trip_id) DO UPDATE SET
	content = EXCLUDED.content,
    trip_id = EXCLUDED.trip_id,
    user_id = EXCLUDED.user_id,
	weather_change = EXCLUDED.weather_change,
    created_at = EXCLUDED.created_at;
	`
)

var columnsToInsert = []string{
	"content",
	"trip_id",
	"user_id",
	"created_at",
	"weather_change",
}

func (r *notificationRepository) List(ctx context.Context, userID uint64) ([]domain.Notifications, error) {

	var (
		notificationDAO domain.NotificationDAO
		notification    domain.Notifications
		notifications   []domain.Notifications
	)
	rows, err := r.db.Query(ctx, queryFetchNotifications, userID)
	if err != nil {
		log.Printf("error while listing notification:%s", err.Error())
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
			&notificationDAO.WeatherChange,
		)
		if err != nil {
			log.Printf("error while scaning rows in listing notification:%s", err.Error())
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

func (r *notificationRepository) Insert(ctx context.Context, notification domain.Notifications) error {

	singleRowParams := []any{
		notification.Content,
		notification.TripID,
		notification.UserID,
		time.Now(),
		notification.WeatherChange,
	}

	placeHolders := utils.GeneratePlaceHolders(len(columnsToInsert), 1)
	query := fmt.Sprintf(queryInsertNotification, strings.Join(columnsToInsert, ","), placeHolders)
	_, err := r.db.Exec(ctx, query, singleRowParams...)
	if err != nil {
		return err
	}
	return nil
}
