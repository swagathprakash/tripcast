package domain

import "time"

type NotificationsDTO struct {
	NotificationID uint64    `json:"notification_id"`
	Content        string    `json:"content"`
	TripID         uint64    `json:"trip_id"`
	UserID         uint64    `json:"user_id"`
	IsRead         bool      `json:"is_read"`
	CreatedAt      time.Time `json:"created_at"`
}

func (dto *NotificationsDTO) MapFromDomain(domain Notifications) {
	dto.NotificationID = domain.NotificationID
	dto.Content = domain.Content
	dto.TripID = domain.TripID
	dto.UserID = domain.UserID
	dto.IsRead = domain.IsRead
	dto.CreatedAt = domain.CreatedAt
}
