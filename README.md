# react-antd-event-calender-assignment

## 🌟 프로젝트 소개

`React`와 `Ant Design`을 활용한 일정 관리 캘린더 애플리케이션입니다. 날짜별로 일정을 추가, 관리하고 완료 여부를 표시할 수 있습니다.

## 📢 주요 기능

- 날짜별 일정 추가 및 관리
- 일정 완료 체크
- 일정 삭제
- 캘린더에서 일정 확인

## 📢 기술 스택

- React
- Ant Design
- dayjs(날짜 처리 라이브러리)
- JavaScript(ES6+)
- CSS3

## 📢 설치 및 실행

#### 1. 저장소 클론

```bash
git clone https://github.com/anhyunji494/react-antd-todo-list-assignment.git
cd react-antd-calendar
```

#### 2. 의존성 설치

```bash
yarn install
```

#### 실행

```bash
yarn start
```

## 📢 주요 기능

### 🎇 날짜 선택 및 일정 관리

- 캘린더에서 날짜를 선택하여 해당 날짜의 일정을 확인하고 관리할 수 있습니다.
- 선택한 날짜에 새 일정을 추가할 수 있습니다.

### 🎇 일정 완료 체크

- 각 일정 항목에 체크박스를 통해 완료 여부를 표시할 수 있습니다.
- 완료된 일정은 취소선으로 표시합니다.

### 🎇 일정 삭제

- 각 일정 항목 옆 삭제 버튼을 통해 일정을 삭제할 수 있습니다.

## 📢 구현

### 🖼 Structure

```
react-antd-calendar/
├── src/
│   ├── components/
│   │   └── DatePickerComponent/
│   │       └── DatePickerComponent.js
│   ├── App.js
│   ├── App.css
│   └── index.js
├── public/
├── package.json
└── README.md
```

### 🖼 주요 컴포넌트

#### App.js

- 메인 애플리케이션
- 로직과 상태 관리
- 캘린더 렌더링 및 일정 관리 기능 구현

#### DatePickerComponent

- Ant Design의 DatePicker를 이용해 날짜 선택 기능 제공

```JavaScript
import React from 'react';
import { DatePicker } from 'antd';

const DatePickerComponent = ({ onDateChange, value }) => {
  const onChange = (date) => {
    onDateChange(date);
  };

  return (
    <DatePicker
      onChange={onChange}
      value={value}
      defaultValue={value}
      style={{ width: '100%' }}
    />
  );
};

export default DatePickerComponent;
```

### 🖼 주요 기능 구현

#### 상태 관리

```javascript
const [selectedDate, setSelectedDate] = useState(dayjs());
const [events, setEvents] = useState({});
const [selectedDateEvents, setSelectedDateEvents] = useState([]);
```

#### 일정 추가

```javascript
const addNewEvent = () => {
  if (newEvent.trim().length > 0) {
    const dateStr = selectedDate.format('YYYY-MM-DD');
    const newEventObj = {
      id: Date.now(),
      content: newEvent.trim(),
      completed: false,
    };
    setEvents((prev) => ({
      ...prev,
      [dateStr]: [...(prev[dateStr] || []), newEventObj],
    }));
    setSelectedDateEvents((prev) => [...prev, newEventObj]);
    setNewEvent('');
  }
};
```

#### 일정 완료 상태 토글

```javascript
const toggleEventComplete = (id) => {
  const dateStr = selectedDate.format('YYYY-MM-DD');
  setEvents((prev) => ({
    ...prev,
    [dateStr]: prev[dateStr].map((event) =>
      event.id === id ? { ...event, completed: !event.completed } : event
    ),
  }));
  // ... 생략
};
```

#### 일정 삭제

```javascript
const deleteEvent = (id) => {
  const dateStr = selectedDate.format('YYYY-MM-DD');
  setEvents((prev) => ({
    ...prev,
    [dateStr]: prev[dateStr].filter((event) => event.id !== id),
  }));
  // ... 생략
};
```

## 📢 학습 및 성장

- React Hooks(`useState`)를 활용한 복잡한 상태 관리 방법 학습
- Ant Design의 컴포넌트(`Calendar`, `Modal` 등) 활용 경험
- dayjs를 이용한 날짜 처리 방법
- 컴포넌트 분리와 props를 통한 데이터 전달 방식
