package utils

import (
	"fmt"
	"log"
	"strings"
	"time"
)

func GeneratePlaceHolders(columns, rows int) string {
	var row []string
	var columValue = 1
	for i := 1; i <= rows; i++ {
		var cols []string
		for j := 1; j <= columns; j++ {
			cols = append(cols, fmt.Sprintf("$%d", columValue))
			columValue++
		}
		onerRow := fmt.Sprintf("(%s)", strings.Join(cols, ","))
		row = append(row, onerRow)
	}
	return strings.Join(row, ",")
}

func ConvertToIndianMobileNumberFormat(mobileNumber string) string {
	number := fmt.Sprintf("+91%s", mobileNumber)
	return number
}

func IsCommonElementPresent[T comparable](slice1, slice2 []T) bool {
	slice1Map := make(map[T]struct{}, len(slice1))

	for _, val := range slice1 {
		slice1Map[val] = struct{}{}
	}

	for _, val := range slice2 {
		if _, ok := slice1Map[val]; ok {
			return true
		}
	}

	return false
}

func BackgroundProcesses(params any) (any, error) {
	for {
		ticker := time.NewTicker(5 * time.Second)

		for range ticker.C {
			// code to execute
			log.Println("5 seconds has pased")
		}
	}
}
