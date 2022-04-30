import styled from "styled-components";
import { LeaderPosition } from "./LeaderPosition";

export default function TopLeaders() {
  const tableData = [
    {
      id: 1,
      place: 1,
      userName: "Yaroslav Isakov",
      regDate: "21.02, 13:23",
      earn: 5678,
    },
    {
      id: 2,
      place: 2,
      userName: "Leonid Isakov",
      regDate: "21.02, 13:23",
      earn: 4567,
    },
    {
      id: 3,
      place: 3,
      userName: "Ivan Isakov",
      regDate: "21.02, 13:23",
      earn: 3456,
    },
    {
      id: 4,
      place: 4,
      userName: "Vitaly Isakov",
      regDate: "21.02, 13:23",
      earn: 2345,
    },
    {
      id: 5,
      place: 5,
      userName: "Maks Isakov",
      regDate: "21.02, 13:23",
      earn: 1234,
    },
  ];

  return (
    <LeadersWrapper>
      <LeaderPosition data={tableData[1]} />
      <LeaderPosition data={tableData[0]} />
      <LeaderPosition data={tableData[2]} />
    </LeadersWrapper>
  );
}

const LeadersWrapper = styled.div`
  width: 951px;
  height: 350px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
