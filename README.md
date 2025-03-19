# DEVSTACKTREND

## 배포주소

https://devstacktrend.sungho.site/

<br>

## 프로젝트 개요

- 개발자 채용 트렌드를 확인할 수 있는 기술스택 랭킹 사이트
- next.js를 이용한 프론트엔드 및 백엔드 개발
- node.js, prisma, mysql 활용 채용공고 크롤링
- express.js 활용한 이미지서버 구축
- <a href="https://github.com/CSH111/trend-crawler">크롤러 레포</a>
- <a href="https://github.com/CSH111/img-server">이미지서버 레포</a>

  <br>

## 프로젝트 기간....

- 2024/06/04 ~

<br>

## 기술스택

- 프론트엔드

  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB"/>
  <img src="https://img.shields.io/badge/next.js-ffffff?style=for-the-badge&logo=next.js&logoColor=000000"/>
  <img src="https://img.shields.io/badge/typescript-2f74c0?style=for-the-badge&logo=typescript&logoColor=white"/>
  <img src="https://img.shields.io/badge/react--query-f7f7f7?style=for-the-badge&logo=reactquery&logoColor=f73f51"/>
  <img src="https://img.shields.io/badge/Material--UI-f6f8fa?style=for-the-badge&logo=mui&logoColor=007fff">
  <img src="https://img.shields.io/badge/styled--components-DB7093?style=for-the-badge&logo=styled-components&logoColor=white"/>

<br>

- 백엔드

  <img src="https://img.shields.io/badge/next.js-ffffff?style=for-the-badge&logo=next.js&logoColor=000000"/>
  <img src="https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white"/>
  <img src="https://img.shields.io/badge/prisma-ffffff?style=for-the-badge&logo=prisma&logoColor=000000"/>
  <img src="https://img.shields.io/badge/Express.js-404D59?style=for-the-badge&logo=express" />
  <img src="https://img.shields.io/badge/mysql-00718b?style=for-the-badge&logo=mysql&logoColor=white" />

<br>

## 학습, 구현 및 개선사항

- REST api 의 설계, 구현, 및 통신
- Next 14 app router, server component 활용 ssr 구현
- prisma ORM 활용 MYSQL db CRUD
- express.js 활용 이미지 서버 구축
- HeadBar, SearchBar, SideBar, 로딩처리, 반응형 웹 등 styled-components 및 mui를 이용한 UI구현
- AWS RDS, AWS EC2, AWS ROUTE 53 활용 프로젝트 배포

<br>

## 기능소개

- [메인 페이지](#메인-페이지)
- [카테고리별 순위 페이지](#카테고리별-순위-페이지)
- [키워드 상세 페이지](#키워드-상세-페이지)
- [키워드 검색 기능](#키워드-검색-기능)
- [반응형 레이아웃](#반응형-레이아웃)

<br>

## 메인 페이지

<div align="left">
  <img src="https://github.com/CSH111/trend-rank/assets/105113833/1904186a-b15e-495b-8bb5-61e8eccafa96" width="650px" />
</div>
<br>

- 최근 수집일 기준 모든 카테고리의 키워드 순위를 확인할 수 있습니다.

<br>

## 카테고리별 순위 페이지

<div align="left">
  <img src="https://github.com/CSH111/trend-rank/assets/105113833/cddd1816-c66e-4ac5-9cda-62598dae445e" width="650px" />
</div>
<br>

- 카테고리별 순위를 확인할 수 있습니다.
- 페이지네이션 및 페이지 이동시 스크롤 위치를 저장합니다.

<br>

## 키워드 상세 페이지

<div align="left">
  <img src="https://github.com/CSH111/trend-rank/assets/105113833/8f12aa43-ba32-4f59-8fb0-597fc0b49ded" width="650px" />
</div>

<br>

- 키워드별 공고수 변화 추이를 확인할 수 있습니다.
- 키워드를 담고있는 채용공고 링크를 확인할 수 있습니다.

<br>

## 키워드 검색 기능

<div align="left">
  <img src="https://github.com/CSH111/trend-rank/assets/105113833/8135ab2c-4fa1-4070-8ffc-96896256abf4" width="450px" />
</div>
<br>

- 수집중인 키워드를 검색 및 상세페이지로 이동할 수 있습니다.
- react-query를 활용해 api 요청횟수를 최적화했습니다.

<br>

## 반응형 레이아웃

<div align="left">
  <img src="https://github.com/CSH111/trend-rank/assets/105113833/edb935d1-00cb-4793-9d7c-155cc213e447" width="650px" />
</div>
<br>
- 미디어쿼리를 이용해 반응형 레이아웃을 구현했습니다.

<br>

### 개발예정사항

- 상단바 상위권 순위표시 ui
- 채용공고목록 플랫폼 필터
