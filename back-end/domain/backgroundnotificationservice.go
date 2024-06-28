package domain

type BackgroundNotificationUsecase interface{
	BackgroundNotificationProcesses(params any) (any, error)
}
