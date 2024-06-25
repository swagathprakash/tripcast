package utils

import (
	"fmt"
	"strings"
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
