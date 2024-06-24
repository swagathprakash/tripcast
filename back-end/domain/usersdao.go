package domain

import "github.com/jackc/pgx/v5/pgtype"

type UsersDAO struct {
	UserID       pgtype.Int8
	FirstName    pgtype.Text
	LastName     pgtype.Text
	MobileNumber pgtype.Text
}

func (dao *UsersDAO) MapToDomain(domain *Users) {
	domain.UserID = uint64(dao.UserID.Int64)
	domain.FirstName = dao.FirstName.String
	domain.LastName = dao.LastName.String
	domain.MobileNumber = dao.MobileNumber.String
}
