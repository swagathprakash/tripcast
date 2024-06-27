package domain

import (
	"context"
	"time"
)

type Notifications struct {
	NotificationID uint64
	Content        string
	TripID         uint64
	UserID         uint64
	IsRead         bool
	CreatedAt      time.Time
}

type NotificationRepository interface {
	List(ctx context.Context, userID uint64) ([]Notifications, error)
}

type NotificationUsecase interface {
	List(ctx context.Context, userID uint64) ([]NotificationsDTO, error)
}
