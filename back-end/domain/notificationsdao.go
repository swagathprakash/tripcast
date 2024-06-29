package domain

import (
	"encoding/json"

	"github.com/jackc/pgx/v5/pgtype"
)

type NotificationDAO struct {
	NotificationID pgtype.Int8
	Content        pgtype.Text
	TripID         pgtype.Int8
	UserID         pgtype.Int8
	IsRead         pgtype.Bool
	CreatedAt      pgtype.Timestamp
	WeatherChange  pgtype.Text
}

func (dao *NotificationDAO) MapToDomain(domain *Notifications) {
	domain.NotificationID = uint64(dao.NotificationID.Int64)
	domain.Content = dao.Content.String
	domain.TripID = uint64(dao.TripID.Int64)
	domain.UserID = uint64(dao.UserID.Int64)
	domain.IsRead = dao.IsRead.Bool
	domain.CreatedAt = dao.CreatedAt.Time
	domain.WeatherChange = json.RawMessage(dao.WeatherChange.String)
}
