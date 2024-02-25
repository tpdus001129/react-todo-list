# ✏️ todo list

#### ⬇️ 필터와 체크 기능이 있는 todo list ⬇️

[https://tpdus001129.github.io/react-todo-list/#/main](https://tpdus001129.github.io/react-todo-list/#/main)<br/><br/>

## 기술스택

<div align="left">  
  <img src="https://img.shields.io/badge/React-61DAFB?style=flat-square&logo=React&logoColor=black"/>
  <img src="https://img.shields.io/badge/MUI-007FFF?style=flat-square&logo=MUI&logoColor=white"/>
  <img src="https://img.shields.io/badge/Tailwind CSS-06B6D4?style=flat-square&logo=Tailwind CSS&logoColor=white"/>
  <img src="https://img.shields.io/badge/Recoil-3578E5?style=flat-square&logo=Recoil&logoColor=white"/>
</div>
<br/>

## 주요기능

**[ 메인 페이지와 할 일 추가 페이지 ]**  
<br />

![1번](https://github.com/tpdus001129/react-todo-list/assets/113432040/1ba73290-7a00-48d7-aba6-333dd615154e)

<br /><hr />

**[ 필터 기능 ]**
<br />

**급한순** - 할 일 시간을 기준으로 현재 시간과 가까운 순서대로 정렬된다.  
**널널한순** - 할 일 시간을 기준으로 현재 시간과 먼 순서대로 정렬된다.  
**작성순** - 작성 시간 순서대로 정렬된다.  
<br />

![2번](https://github.com/tpdus001129/react-todo-list/assets/113432040/5c8daacc-71af-425b-a81a-5e9b9ca6f203)

<br /><hr />

**[ 체크 기능 ]**
<br />

**완료** - 할 일을 완료한 리스트를 필터링 한다.  
**미완료** - 할 일을 완료하지 않은 리스트를 필터링 한다.  
<br />

![3번](https://github.com/tpdus001129/react-todo-list/assets/113432040/ed194c8d-aca2-46d8-b1c8-e852ddbeeaed)

<br /><hr />

**[ 삭제 & 수정 기능 ]**
<br />

**리스트 메뉴 클릭 시, 스낵바 생성** - 삭제 & 수정 가능  
삭제 & 수정 시 알림창 생성
<br />

![4번](https://github.com/tpdus001129/react-todo-list/assets/113432040/4974da04-53d5-426e-a36c-0c43df4ef84b)

<br /><hr />

**[ Recoil-persist를 이용한 데이터 보관 ]**
<br />

**persistAtomLastTodoId** - 현재까지 생성된 리스트의 마지막 번호  
**persistAtomCommon** - 완료/미완료 & 급한순/널널한순/작성순 필터  
**persistAtomTodos** - 리스트들의 상세 데이터  
<br />

![bandicam 2024-02-25 19-37-03-798](https://github.com/tpdus001129/react-todo-list/assets/113432040/a92d5baf-bcf0-43f2-b7a4-e31c048ac5ef)
