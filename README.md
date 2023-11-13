# upbit-trade💰
## 목차
[1. 배포](#1-배포)

[2. 설치 및 실행](#2-설치-및-실행)

[3. 프로젝트 소개](#3-프로젝트-소개)

[4. 기술스택](#4-기술스택)

[5. 주요 기능](#5-주요-기능)

[6. 프로젝트 시연](#6-프로젝트-시연)

[7. 개발 이슈](#7-개발-이슈)

[8. 개발 회고](#8-개발-회고)

[9. 참고](#9-참고)

## 1. 배포
### https://chuyeonbin.github.io/upbit-trade

## 2. 설치 및 실행
```jsx
git clone https://github.com/chuyeonbin/upbit-trade.git
cd upbit-trade
yarn install
yarn start
```

## 3. 프로젝트 소개
<p>upbit에서 제공하는 api를 활용한 실시간 코인 정보 제공 사이트 구현 하였습니다. 100% 혼자 프로젝트를 진행하였습니다.</p>
<p>redux와 redux-saga를 어떤식으로 사용하는지에 대한 이해와 websocket에서 실시간으로 들어오는 대규모 데이터를 처리하는 방법 배우게 되었습니다.</p>

## 4. 기술스택
<img src=https://img.shields.io/badge/Typescript-v4.4.2-3178C6 /> <img src=https://img.shields.io/badge/React-v18.2.0-61DAFB /> 

<img src=https://img.shields.io/badge/redux_toolkit-v1.8.5-764ABC /> <img src=https://img.shields.io/badge/redux_saga-v1.2.1-999999 /> 

<img src=https://img.shields.io/badge/styled_components-v5.3.5-DB7093 /> <img src=https://img.shields.io/badge/material_ui-v5.10.8-007FFF /> 

<img src=https://img.shields.io/badge/highcharts-v10.3.1-EE672F />

## 5. 주요 기능
* websocket으로 현재가, 체결가, 호가 실시간 데이터 렌더링
* 차트
  * 선택한 코인 데이터 차트 렌더링
  * 일봉, 주봉, 월봉, 1분봉, 5분봉, 10분봉 클릭시 해당 차트 렌더링
  * 이전 날짜 차트 데이터 렌더링
* 코인명 한글 초성 퍼지 검색
* 코인 수량에 따라서 주문총액 자동으로 바꾸기

## 6. 프로젝트 시연

### highcharts 렌더링
https://user-images.githubusercontent.com/40565619/211499879-40a9ee16-d5d2-4fbd-a223-323134000e65.mov
### 코인명 한글 초성 퍼지 검색
https://user-images.githubusercontent.com/40565619/211501610-6edf3f53-44de-4593-9c94-4feeaeca4c26.mov
### 코인 수량에 따라서 주문총액 자동으로 바꾸기
https://user-images.githubusercontent.com/40565619/211502440-28babd07-47cb-45eb-a309-b5af99502541.mov
### 실시간 체결
https://user-images.githubusercontent.com/40565619/211502945-58a37d67-3200-4f7e-a01b-419009f1fb34.mov

## 7. 개발 이슈
업로드 예정

## 8. 개발 회고
* redux-toolkit
  * redux만 사용 했을 때 보다 보일러 플레이트가 줄어들어서 굉장히 좋았다. 하지만 server state를 효율적으로 관리 할 수 없다는 문제점과 하나의 api 요청을 처리하기 위해서는 여러개의 action과 reducer가 필요하다. 그러다보니 coin slice 파일의 코드 줄이 400줄이 넘어가서 한 파일이 너무 비대 해졌다. 리팩토링을 할 때는 서버 상태를 관리해주는 react-query를 도입 하면 이러한 문제점을 해결할 수 있을 것 같다.
* redux-saga
  * redux-saga에 대해 아직도 지식이 부족하다고 생각하지만 만들면서 많이 배웠다고 생각한다. 그중에서도 여러가지 effect들이 있지만 throttle effect를 유용하게 사용 하였다.
    throttle effect를 적용하기 전에는 이전 캔들 데이터가 무한(?)으로 get 요청 되는 버그가 발생 하였는데 throttle effect를 적용 시켜서 지정한 시간동안에는 들어온 액션은 한번만 실행 하게끔 하여서 문제를     해결할 수 있었다.
  * redux-saga를 사용하기 전에는 websocket으로부터 들어오는 메시지를 redux-toolkit에서 제공하는 createAsyncThuck 함수를 사용해서 메시지가 들어올때마다 dispatch 하는 방식으로 처음에는 해결 하려고 하였다. 하지만 들어오는 데이터가 한 두개도 아니고 1초에 100개이상 되는 메시지가 발생하니 렌더링도 1초에 100번이상 일어나는 성능상 큰 이슈가 발생 하였다. 그래서 열심히 구글링 해서 찾은 결과 redux-saga에서 제공하는 channel이라는 것을 활용해서 해결할 수 있었다.
* highcharts
  * 차트 라이브러리 중에서 highcharts를 고른 이유는 다른 차트 라이브러리보다 사용하기 간편하고 무엇보다도 문서화가 잘 되있어서 바로바로 적용해서 사용하기 간편했다. 그리고 stockchart를 커스터마이징 할 수 있는 기능이 많고, highcharts의 options부분만 state로 관리 해주면 쉽게 업데이트하고 렌더링 할 수 있어서 좋았다. 다만 아쉬웠던 부분은 차트 zoom in&out 부분을 커스텀하는 부분이 없어서 아쉬웠다.
* 생각했던 것 보다 공부하면서 만들다보니 정해놨던 프로젝트 기간을 초과해서 만들게 되었다. 결과론적으로는 프로젝트를 완성 시키긴 했지만 시간적으로 못끝내게 된게 많이 아쉽다. 그래도 내가 생각했던 기능들은 전부 구현해서 만족스러운 결과를 얻은 것 같다. 

## 9. 참고
[Using Channels](https://redux-saga.js.org/docs/advanced/Channels/)

[Redux-Saga Channel 이란](https://uzihoon.com/post/af9b4d60-7d39-11ea-8fbc-1767c42620cf)

[Redux-Saga: Channel](https://ui.toast.com/posts/ko_20180316)

[Redux-Saga에서의 WebSocket(socket.io) 이벤트 처리](https://meetup.nhncloud.com/posts/114)

[React 최적화 - buffer를 활용하여 상태 갱신 줄이기](https://velog.io/@seongkyun/React-%EC%B5%9C%EC%A0%81%ED%99%94-buffer%EB%A5%BC-%ED%99%9C%EC%9A%A9%ED%95%98%EC%97%AC-%EC%83%81%ED%83%9C-%EA%B0%B1%EC%8B%A0-%EC%A4%84%EC%9D%B4%EA%B8%B0)

[디바운스(Debounce)와 스로틀(Throttle ) 그리고 차이점](https://webclub.tistory.com/607)

[[JS] 한글도 지원하는 퍼지 문자열 검색](https://taegon.kim/archives/9919)

