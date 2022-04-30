import styled from "styled-components";
import { ReactComponent as ArrowsBotFaq } from "../../assets/img/faqArrowBottom.svg";
import { ReactComponent as ArrowsTopFaq } from "../../assets/img/faqArrowsTop.svg";

type PropsTypeAccordFaq = {
  title: string;
  content: string;
  id: number;
  activeSection: number | null;
  setActiveSetcion: (a: number | null) => void;
};

export default function AccordionFaq({
  id,
  title,
  content,
  activeSection,
  setActiveSetcion,
}: PropsTypeAccordFaq) {
  return (
    <AccordItem active={activeSection === id}>
      <AccordTitle
        onClick={() => setActiveSetcion(activeSection === id ? null : id)}
      >
        <AccordOpenTitle>{title}</AccordOpenTitle>
        <AccordOpenClose>
          {activeSection === id ? <ArrowBottom /> : <ArrowTop />}
        </AccordOpenClose>
      </AccordTitle>
      {activeSection === id && (
        <AccordText onClick={() => setActiveSetcion(null)}>
          {content}
        </AccordText>
      )}
    </AccordItem>
  );
}

const ArrowBottom = styled(ArrowsBotFaq)``;
const ArrowTop = styled(ArrowsTopFaq)``;

const AccordItem = styled.div<{
  active: boolean;
}>`
  font-size: 14px;
  line-height: 17px;
  opacity: ${active => (active ? `1` : `0.5`)};
`;

const AccordTitle = styled.div`
  display: flex;
  justify-content: space-between;
  height: 60px;

  border-radius: 12px;
  background: linear-gradient(90deg, #151b24 0%, #10161c 100%);
  align-items: center;
  margin-bottom: 8px;
  padding: 0 20px;

  :hover {
    cursor: pointer;
  }
`;

const AccordText = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 8px;
  padding: 10px 20px;
  border-radius: 12px;
  background: linear-gradient(90deg, #151b24 0%, #10161c 100%);
  line-height: 38px;

  :hover {
    cursor: pointer;
  }
`;
const AccordOpenTitle = styled.div``;

const AccordOpenClose = styled.div``;
