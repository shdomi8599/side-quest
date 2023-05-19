import { AiFillStar } from 'react-icons/ai';
import EiditorSkeleton from '../skeleton/EiditorSkeleton';
import dynamic from 'next/dynamic';
import hljs from 'highlight.js';
import { RiThumbUpFill, RiThumbUpLine } from 'react-icons/ri';
import { loggedInUserState } from '@/recoil/atom';
import { useRecoilValue } from 'recoil';
import { Answer } from '@/types/answer';
import { useState } from 'react';
import { UseMutationResult } from 'react-query';
import { AxiosResponse } from 'axios';
import styled from 'styled-components';

const Editor = dynamic(() => import('@/components/editor/Editor'), {
  ssr: false,
  loading: () => <EiditorSkeleton />,
});

//이상하게 Editor에서 조건부로 옵션을 설정하면 editor가 고장나서 상위에서 설정한 옵션을 내려주는 방식으로 해결하였음
const ANSWER_OPTIONS: EasyMDE.Options = {
  renderingConfig: {
    codeSyntaxHighlighting: true,
    hljs,
  }, //hljs 사용
  maxHeight: '67px',
  spellChecker: false, //스펠체크 off
  status: false, //우측 하단 상태
  previewClass: ['markdown-body'], //github 마크다운 사용
  hideIcons: ['guide', 'fullscreen', 'side-by-side'], //버튼 가리기
};

type DeleteAnswerMutation = UseMutationResult<
  AxiosResponse<any, any> | undefined,
  unknown,
  {
    answerId: number;
  },
  unknown
>;

type EditAnswerMutation = UseMutationResult<
  AxiosResponse<any, any>,
  unknown,
  {
    answerId: number;
    content: string;
  },
  unknown
>;

type Props = {
  answer: Answer;
  deleteAnswer: DeleteAnswerMutation;
  editAnswer: EditAnswerMutation;
};

const AnswerItem = ({ answer, deleteAnswer, editAnswer }: Props) => {
  //유저 데이터
  const loggedInUser = useRecoilValue(loggedInUserState);

  //답글 수정 관련
  const [edit, setEdit] = useState(false);
  const [editVal, setEditVal] = useState('');
  const onEdit = () => {
    if (confirm('정말 수정하시겠습니까?')) setEdit(true);
  };
  const offEdit = () => {
    setEdit(false);
  };
  const changeEditVal = (value: string) => {
    setEditVal(value);
  };

  const editEvent = () => {
    editAnswer.mutate({
      answerId: answer.answerId,
      content: editVal,
    });
    offEdit();
  };

  const deleteEvent = () => {
    deleteAnswer.mutate({ answerId: answer.answerId });
  };
  return (
    <Box>
      {edit ? (
        <>
          <Editor
            content={editVal}
            commentOptions={ANSWER_OPTIONS}
            changeContent={changeEditVal}
            type={'answer'}
          />
          <div className="edit-box">
            <button onClick={editEvent}>수정 완료</button>
            <button onClick={offEdit}>수정 취소</button>
          </div>
        </>
      ) : (
        <>
          <div className="like-box">
            {/* 좋아요 추가되면 넣을 듯?*/}
            {true ? <RiThumbUpLine size={30} /> : <RiThumbUpFill size={30} />}
          </div>
          <div className="content-box">
            <div className="top">{answer.content}</div>
            <div className="bottom">
              <div className="update-box">
                <button>댓글 작성</button>
                {loggedInUser?.email === answer.memberInfo.email && (
                  <>
                    <button onClick={deleteEvent}>삭제</button>
                    <button onClick={onEdit}>수정</button>
                  </>
                )}
              </div>
              <div className="user-box">
                <div className="user-img">
                  <img src={answer.memberInfo.profileImageUrl} alt="user" />
                </div>
                <div className="user-detail">
                  <div className="user-id">{answer.memberInfo.name}</div>
                  <div className="user-star">
                    <AiFillStar />
                    {answer.memberInfo.totalStar}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </Box>
  );
};

export default AnswerItem;

const Box = styled.li`
  border: 1px solid black;
  height: 140px;
  display: flex;
  position: relative;
  .edit-box {
    position: absolute;
    display: flex;
    gap: 16px;
    right: 8px;
    top: 12px;
  }

  .like-box {
    min-width: 60px;
    padding: 8px;
    display: flex;
    justify-content: center;
    align-items: center;
    > svg {
      cursor: pointer;
    }
  }
  .content-box {
    display: flex;
    flex-direction: column;
    flex: 2;
    .top {
      padding: 12px;
      flex: 0.7;
    }
    .bottom {
      flex: 0.3;
      display: flex;
      justify-content: space-between;
      padding: 8px;
      .update-box {
        display: flex;
        align-items: center;
        gap: 16px;
        button {
          cursor: pointer;
        }
      }
      .user-box {
        display: flex;
        gap: 16px;
        .user-img {
          height: 40px;
          width: 40px;
          > img {
            border-radius: 50%;
            width: 100%;
            height: 100%;
          }
        }
        .user-detail {
          display: flex;
          flex-direction: column;
          justify-content: center;
          .user-id {
          }
          .user-star {
          }
        }
      }
    }
  }
`;
