import styled from "styled-components";
import { useTable } from "react-table";
import React from "react";
import photoImg from "../../assets/img/photo.png";
import calendarIcon from "../../assets/img/calendar.svg";
import diamondIcon from "../../assets/img/smallDiamond.svg";

enum Headers {
  PLACE = "Place",
  USER = "User",
  DATE = "Registration date",
  EARN = "Earned",
}

export type TableDataType = {
  id: number;
  place: number;
  user: string;
  regDate: string;
  earn: number;
};

const tableData = [
  {
    id: 1,
    place: 1,
    user: "Yaroslav Isakov",
    regDate: "21.02, 13:23",
    earn: 5678,
  },
  {
    id: 2,
    place: 2,
    user: "Leonid Isakov",
    regDate: "21.02, 13:23",
    earn: 4567,
  },
  {
    id: 3,
    place: 3,
    user: "Ivan Isakov",
    regDate: "21.02, 13:23",
    earn: 3456,
  },
  {
    id: 4,
    place: 4,
    user: "Vitaly Isakov",
    regDate: "21.02, 13:23",
    earn: 2345,
  },
  {
    id: 5,
    place: 5,
    user: "Maks Isakov",
    regDate: "21.02, 13:23",
    earn: 1234,
  },
];

export const TopTable = () => {
  const columns = React.useMemo(
    () => [
      {
        Header: Headers.PLACE,
        accessor: (originalRow: TableDataType) => (
          <PlaceCell>
            <TableText># {originalRow.place}</TableText>
          </PlaceCell>
        ),
      },
      {
        Header: Headers.USER,
        accessor: (originalRow: TableDataType) => (
          <UserCell>
            <img src={photoImg} alt="" />
            <TableText>{originalRow.user}</TableText>
          </UserCell>
        ),
      },
      {
        Header: Headers.DATE,
        accessor: (originalRow: TableDataType) => (
          <DateCell>
            <img src={calendarIcon} alt="" />
            <TableText>{originalRow.regDate}</TableText>
          </DateCell>
        ),
      },
      {
        Header: Headers.EARN,
        accessor: (originalRow: TableDataType) => (
          <EarnCell>
            <TableText>{originalRow.earn} </TableText>
            <img src={diamondIcon} alt="" />
          </EarnCell>
        ),
      },
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [tableData],
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({
      data: tableData || [],
      columns,
    });

  return (
    <TableWrapper>
      <Table {...getTableProps()}>
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => {
                return (
                  <th {...column.getHeaderProps()}>
                    {column.render("Header")}
                  </th>
                );
              })}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map(row => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map(cell => {
                  return (
                    <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </Table>
    </TableWrapper>
  );
};

const TableWrapper = styled.div`
  max-width: 1080px;
  width: 100%;
`;

const Table = styled.table`
  width: 100%;
  border-radius: 5px;
  border-spacing: 0 12px;
  border-collapse: separate;

  thead {
    tr {
      background: #0b1014;
      border-radius: 12px;
      text-align: left;

      th {
        font-weight: normal;
        font-size: 14px;
        line-height: 17px;
        color: #616d7a;
        padding: 17px 0;

        &:last-child {
          border-top-right-radius: 12px;
          border-bottom-right-radius: 12px;
        }

        &:first-child {
          padding-left: 20px;
          border-top-left-radius: 12px;
          border-bottom-left-radius: 12px;
        }
      }
    }
  }

  tbody {
    tr {
      background: #10161c;
      border-radius: 12px;
      margin-top: 12px;

      &:first-child {
        > td {
          &:first-child {
            background: linear-gradient(
              90deg,
              #ffc700 -289.5%,
              rgba(255, 199, 0, 0) 50%
            );

            span {
              color: #ffdf6f;
            }
          }
        }
      }

      &:nth-child(2) {
        > td {
          &:first-child {
            background: linear-gradient(
              90deg,
              #e3e3e3 -289.5%,
              rgba(236, 236, 236, 0) 50%
            );

            span {
              color: #d7d8dc;
            }
          }
        }
      }

      &:nth-child(3) {
        > td {
          &:first-child {
            background: linear-gradient(
              90deg,
              #ff3d00 -289.5%,
              rgba(255, 81, 43, 0) 50%
            );

            span {
              color: #d17c4d;
            }
          }
        }
      }
    }

    tr:nth-child(2n + 1) {
      background: linear-gradient(90deg, #151b24 0%, #10161c 100%);
    }

    td {
      padding: 9px 0;
      vertical-align: middle;

      &:last-child {
        border-top-right-radius: 12px;
        border-bottom-right-radius: 12px;
      }

      &:first-child {
        border-top-left-radius: 12px;
        border-bottom-left-radius: 12px;
        min-width: 80px;
        padding-left: 20px;
      }
    }
  }
`;

const TableText = styled.span`
  font-weight: 600;
  font-size: 14px;
  line-height: 17px;
`;

const PlaceCell = styled.div`
  color: #616d7a;
  }
`;

const UserCell = styled.div`
  display: flex;
  align-items: center;
  color: #ffffff;

  > img {
    margin-right: 12px;
    width: 32px;
  }
`;

const DateCell = styled.div`
  display: flex;
  align-items: center;
  color: #616d7a;

  > img {
    margin-right: 10px;
  }
`;

const EarnCell = styled.div`
  display: flex;
  align-items: center;
  color: #ffd63d;

  > img {
    margin-left: 6px;
    width: 18px;
  }
`;
