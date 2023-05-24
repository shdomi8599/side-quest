import styled from 'styled-components';
import { useRouter } from 'next/router';
import { formatDate } from '@/util/date';
import { Community } from '@/types/community';
import { RiThumbUpFill } from 'react-icons/ri';

export default function UserPostCard({ post }: { post: Community }) {
  const router = useRouter();
  const handleClick = () => {
    router.push(`/community/post/${post.articleId}`);
  };

  return (
    <Wrapper onClick={handleClick}>
      <ContentContainer>
        <CardInfo>
          <div className="text-box">
            <span className="title">{post.title}</span>
            <span className="date">작성일 : {`${formatDate(new Date())}`}</span>
          </div>
          <StarRaiting>
            <RiThumbUpFill size={16} style={{ color: '#8217f3' }} />
            <p style={{ marginTop: '5px' }}>{post.totalLikes}</p>
          </StarRaiting>
        </CardInfo>
        <div className="content">{post.content}</div>
      </ContentContainer>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  padding: 20px;
  min-height: 120px;
  margin-bottom: 20px;
  justify-content: space-between;
  align-items: start;
  border-radius: var(--radius-def);
  cursor: pointer;
  background: white;
  transition: all 0.3s;
  :hover {
    box-shadow: 5px 5px 10px 0px rgba(0, 0, 0, 0.5);
    -webkit-box-shadow: 5px 5px 10px 0px rgba(0, 0, 0, 0.5);
    -moz-box-shadow: 5px 5px 10px 0px rgba(0, 0, 0, 0.5);
  }
`;
const Description = styled.span`
  margin-top: 10px;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
`;
const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;

  .content {
    color: #545454;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2; /* Limit to 2 lines */
    -webkit-box-orient: vertical;
    line-height: 1.2em; /* Adjust the line height as needed */
  }
`;
const CardInfo = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;

  .text-box {
    width: 100%;
    display: flex;
    justify-content: space-between;
    .title {
      width: 50%;
      font-size: 18px;
      font-weight: 600;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .date {
      display: flex;
      align-items: center;
      font-size: 13px;
      color: #9f9f9f;
      margin-right: 20px;
    }
  }
`;

const StarRaiting = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  padding: 4px 10px;
  border: 1px solid rgb(215, 226, 235);
  border-radius: 5px;
`;
