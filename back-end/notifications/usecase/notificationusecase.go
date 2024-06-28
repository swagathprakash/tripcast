package usecase

import (
	"context"
	"log"
	"trip-cast/domain"
)

type notificationUsecase struct {
	notificationRepository domain.NotificationRepository
}

func NewNotificationUsecase(notificationRepository domain.NotificationRepository) domain.NotificationUsecase {
	return &notificationUsecase{
		notificationRepository: notificationRepository,
	}
}

func (u *notificationUsecase) List(ctx context.Context, userID uint64) ([]domain.NotificationsDTO, error) {
	var (
		notificationDTO  domain.NotificationsDTO
		notificationList []domain.NotificationsDTO
	)
	notifications, err := u.notificationRepository.List(ctx, userID)
	if err != nil {
		log.Println("failed to list notifications")
		return nil, err
	}
	for _, notification := range notifications {
		notificationDTO.MapFromDomain(notification)
		notificationList = append(notificationList, notificationDTO)
	}

	return notificationList, nil
}


func (u *notificationUsecase) Delete(ctx context.Context, notificationID uint64) error {
	err := u.notificationRepository.DeleteNotification(ctx, notificationID)
	if err != nil {
		log.Println("failed to delete notification with error", err)
		return err
	}
	return nil
}

func (u *notificationUsecase) UpdateNotifications(ctx context.Context, notificationID uint64) error {
	err := u.notificationRepository.UpdateNotifications(ctx, notificationID)
	if err != nil {
		log.Println("failed to delete notification with error", err)
		return err
	}
	return nil
}