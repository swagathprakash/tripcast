package usecase

import "trip-cast/internal/workerpool"

type BackgroundNotificationServiceParams struct {
	WorkerPool *workerpool.WorkerPool
}
