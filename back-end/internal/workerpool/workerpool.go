package workerpool

import "context"

type WorkerPool struct {
	maxNoOfWorkers int
	Task           chan Task
}

type Task struct {
	Func             func(param any) (any, error)
	Param            any
	Ctx              context.Context
	IsResultExpected bool
	Result           chan<- any
	Err              chan<- error
}

func NewWorkerPool(maxNoOfWorkers int) *WorkerPool {
	return &WorkerPool{
		maxNoOfWorkers: maxNoOfWorkers,
		Task:           make(chan Task),
	}
}

func (w *WorkerPool) Start() {
	for i := 0; i < w.maxNoOfWorkers; i++ {
		go w.executeTask()
	}
}

func (w *WorkerPool) executeTask() {
	for task := range w.Task {
		result, err := task.Func(task.Param)
		if task.IsResultExpected {
			if err != nil {
				task.Err <- err
			} else {
				task.Result <- result
			}
		}
	}

}

func (w *WorkerPool) Add(task Task) {
	w.Task <- task
}
