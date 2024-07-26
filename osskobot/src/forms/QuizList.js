const QuizList = (id) => {
  switch (id) {
    case 1:
      return [
        {
          question: "아기 돼지 삼형제에서 벽돌로 집을 지은 돼지는?",
          options: ["첫째 돼지", "둘째 돼지", "셋째 돼지", "엄마 돼지"],
          answer: "셋째 돼지"
        },
        {
          question: "아기 돼지 삼형제에서 늑대가 지푸라기 집을 부순 방법은?",
          options: ["망치로 내려치기", "물 붓기", "기도하기", "입김 불기"],
          answer: "입김 불기"
        },
        {
          question: "아기 돼지 삼형제에서 나무로 집을 지은 돼지는?",
          options: ["첫째 돼지", "둘째 돼지", "셋째 돼지", "아빠 돼지"],
          answer: "둘째 돼지"
        },
        {
          question: "아기 돼지 삼형제에서 지푸라기로 집을 지은 돼지는?",
          options: ["첫째 돼지", "둘째 돼지", "셋째 돼지", "아빠 돼지"],
          answer: "첫째 돼지"
        },
        {
          question: "늑대가 마지막으로 셋째 돼지 집에 들어가려고 했을 때 들어간 곳은?",
          options: ["하수구", "굴뚝", "대문", "창문"],
          answer: "굴뚝"
        }
      ];
    case 2:
      return [
        {
          question: "백설공주에 나오는 난쟁이의 수는?",
          options: ["5", "6", "7", "8"],
          answer: "7"
        },
        {
          question: "백설공주를 독살하려고 한 방법은?",
          options: ["독사과", "독물", "독포도", "독포도주"],
          answer: "독사과"
        },
        {
          question: "백설공주를 돌보는 동물은?",
          options: ["토끼", "사슴", "새", "모두"],
          answer: "모두"
        },
        {
          question: "백설공주를 키운 사람은?",
          options: ["새엄마", "아빠", "할머니", "할아버지"],
          answer: "새엄마"
        },
        {
          question: "백설공주를 사랑한 사람은?",
          options: ["왕자", "기사", "늑대", "사냥꾼"],
          answer: "왕자"
        }
      ];
    case 3:
      return [
        {
          question: "피터팬에서 피터팬이",
          options: ["네버랜드", "원더랜드", "드림랜드", "페어리랜드"],
          answer: "네버랜드"
        },
        {
          question: "피터팬의 친구는?",
          options: ["티나벨", "팅커벨", "티피벨", "탱커벨"],
          answer: "팅커벨"
        },
        {
          question: "피터팬의 적은?",
          options: ["후크 선장", "블랙비어드", "스컬리", "레드비어드"],
          answer: "후크 선장"
        },
        {
          question: "웬디가 사는 곳은?",
          options: ["서울", "부산", "뉴욕", "런던"],
          answer: "런던"
        },
        {
          question: "피터팬이 항상 입는 옷의 색깔은?",
          options: ["빨강", "파랑", "초록", "노랑"],
          answer: "초록"
        }
      ];
    case 4:
      return [
        {
          question: "놀부의 아내가 흥부의 싸다귀를 때린 물건은?",
          options: ["책", "주걱", "몽둥이", "김치"],
          answer: "주걱"
        },
        {
          question: "흥부가 다리를 고쳐준 동물은?",
          options: ["강아지", "고양이", "제비", "까마귀"],
          answer: "제비"
        },
        {
          question: "제비가 흥부의 집에 떨어뜨린 씨앗은?",
          options: ["포도씨", "수박씨", "사과씨", "박씨"],
          answer: "박씨"
        },
        {
          question: "놀부의 집 박 속에서 나온 것은?",
          options: ["금은보화", "기와집", "스마트폰", "도깨비"],
          answer: "도깨비"
        },
        {
          question: "흥부의 박에서 나온 것은?",
          options: ["자동차", "금은보화", "도끼", "블루투스 이어폰"],
          answer: "왕궁"
        }
      ];
    case 5:
      return [
        {
          question: "헨젤과 그레텔의 부모님은?",
          options: ["나무꾼과 아내", "농부와 아내", "어부와 아내", "왕과 왕비"],
          answer: "나무꾼과 아내"
        },
        {
          question: "헨젤과 그레텔이 들어간 숲 속 집은?",
          options: ["과자 집", "나무 집", "돌 집", "얼음 집"],
          answer: "과자 집"
        },
        {
          question: "헨젤과 그레텔을 잡으려 한 사람은?",
          options: ["마녀", "거인", "늑대", "사냥꾼"],
          answer: "마녀"
        },
        {
          question: "헨젤과 그레텔이 남긴 길은?",
          options: ["빵조각", "돌조각", "나무조각", "꽃조각"],
          answer: "빵조각"
        },
        {
          question: "헨젤과 그레텔이 마녀를 물리친 방법은?",
          options: ["불에 태움", "물을 끼얹음", "덫에 가둠", "독을 먹임"],
          answer: "불에 태움"
        }
      ];
    default:
      return [];
  }
};

export default QuizList;
