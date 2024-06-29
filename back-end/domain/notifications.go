package domain

import (
	"context"
	"encoding/json"
	"time"
)

type Notifications struct {
	NotificationID uint64
	Content        string
	TripID         uint64
	UserID         uint64
	IsRead         bool
	WeatherChange  json.RawMessage
	CreatedAt      time.Time
}

type NotificationRepository interface {
	List(ctx context.Context, userID uint64) ([]Notifications, error)
	DeleteNotification(ctx context.Context, notificationID uint64) error
	UpdateNotifications(ctx context.Context, notificationID uint64) error
	Insert(ctx context.Context, notification Notifications) error
}

type NotificationUsecase interface {
	List(ctx context.Context, userID uint64) ([]NotificationsDTO, error)
	Delete(ctx context.Context, notificationID uint64) error
	UpdateNotifications(ctx context.Context, notificationID uint64) error
}
