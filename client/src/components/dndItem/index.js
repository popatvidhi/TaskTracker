import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import './dndItem.scss';

/**
 * 
 * @param {*} param0 
 * @returns dnd item html 
 */
const DnDItem = ({ task, index, setViewTaskVisible }) => {
  return (
    <Draggable key={index} draggableId={task.id.toString()} {...{ index }}>
      {({ draggableProps, dragHandleProps, innerRef }) => (
        <div
          className="draggable-item"
          ref={innerRef}
          {...draggableProps}
          {...dragHandleProps}
          onClick={() => setViewTaskVisible(task)}
        >
          <div className="profile-image">
            <img src={task?.metadata?.owner?.profilePic} alt="profilePicture" />
          </div>
          <div className="task-title">This is {task?.name}</div>
          <div className="task-description">
            {task?.metadata?.detail.length > 200
              ? task?.metadata?.detail.slice(0, 200) + '...'
              : task?.metadata?.detail}{' '}
          </div>
        </div>
      )}
    </Draggable>
  );
};

export default DnDItem;
