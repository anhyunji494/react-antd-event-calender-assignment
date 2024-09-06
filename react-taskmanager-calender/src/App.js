import React, { useState, useEffect } from 'react';
import {
  Badge,
  Calendar,
  Flex,
  Modal,
  Input,
  List,
  Checkbox,
  Button,
} from 'antd';
import dayjs from 'dayjs';
import './App.css';
import DatePickerComponent from './DatePickerComponent/DatePickerComponent';
import { DeleteOutlined } from '@ant-design/icons';

const App = () => {
  const [selectedDate, setSelectedDate] = useState(dayjs());
  const [isEventModalVisible, setIsEventModalVisible] = useState(false);
  const [newEvent, setNewEvent] = useState('');
  const [events, setEvents] = useState({});
  const [selectedDateEvents, setSelectedDateEvents] = useState([]);

  const getListData = (value) => {
    const dateStr = value.format('YYYY-MM-DD');
    return events[dateStr] || [];
  };

  const cellRender = (current, info) => {
    if (info.type === 'date') {
      const listData = getListData(current);
      return (
        <ul className="events">
          {listData.map((item, index) => (
            <li key={index}>
              <Badge
                status={item.completed ? 'success' : 'processing'}
                text={
                  <span
                    style={{
                      textDecoration: item.completed ? 'line-through' : 'none',
                    }}
                  >
                    {item.content}
                  </span>
                }
              />
            </li>
          ))}
        </ul>
      );
    }
    return info.originNode;
  };

  const handleDateChange = (date) => {
    setSelectedDate(date ? dayjs(date) : null);
  };

  const handleDateSelect = (date) => {
    setSelectedDate(date);
    const dateStr = date.format('YYYY-MM-DD');
    const dateEvents = events[dateStr] || [];
    setSelectedDateEvents(dateEvents);
    setIsEventModalVisible(true);
  };

  const toggleEventComplete = (id) => {
    const dateStr = selectedDate.format('YYYY-MM-DD');
    setEvents((prev) => ({
      ...prev,
      [dateStr]: prev[dateStr].map((event) =>
        event.id === id ? { ...event, completed: !event.completed } : event
      ),
    }));
    setSelectedDateEvents((prev) =>
      prev.map((event) =>
        event.id === id ? { ...event, completed: !event.completed } : event
      )
    );
  };

  const deleteEvent = (id) => {
    const dateStr = selectedDate.format('YYYY-MM-DD');
    setEvents((prev) => ({
      ...prev,
      [dateStr]: prev[dateStr].filter((event) => event.id !== id),
    }));
    setSelectedDateEvents((prev) => prev.filter((event) => event.id !== id));
  };

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

  return (
    <Flex vertical align="center" style={{ padding: '20px' }}>
      <div style={{ width: '300px', marginBottom: '20px' }}>
        <DatePickerComponent
          onDateChange={handleDateChange}
          value={selectedDate}
        />
      </div>
      <Calendar
        cellRender={cellRender}
        value={selectedDate}
        onSelect={handleDateSelect}
        style={{ width: '100%', maxWidth: '1000px' }}
      />

      <Modal
        title={`${selectedDate.format('YYYY년 MM월 DD일')} 일정`}
        open={isEventModalVisible}
        onOk={() => setIsEventModalVisible(false)}
        onCancel={() => setIsEventModalVisible(false)}
        footer={null}
      >
        <List
          dataSource={selectedDateEvents}
          renderItem={(event) => (
            <List.Item
              actions={[
                <Button
                  type="text"
                  icon={<DeleteOutlined />}
                  onClick={() => deleteEvent(event.id)}
                />,
              ]}
            >
              <Checkbox
                checked={event.completed}
                onChange={() => toggleEventComplete(event.id)}
              >
                <span
                  style={{
                    textDecoration: event.completed ? 'line-through' : 'none',
                  }}
                >
                  {event.content}
                </span>
              </Checkbox>
            </List.Item>
          )}
        />
        <Input
          placeholder="새 일정을 입력하세요"
          value={newEvent}
          onChange={(e) => setNewEvent(e.target.value)}
          onPressEnter={addNewEvent}
          style={{ marginTop: '16px' }}
        />
      </Modal>
    </Flex>
  );
};

export default App;
