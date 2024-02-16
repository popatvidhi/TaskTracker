import React from 'react';
import { Droppable } from 'react-beautiful-dnd';

import DnDItem from '../dndItem';
import PageSectionTitle from '../pageSectionTitle';
import PageSubTitleTitle from '../pageSubTitle';
import './dndColumn.scss';

/**
 * 
 * @param {*} param0 
 * @returns dnd column html 
 */
const DnDColumn = ({
  sectionId,
  section: { tasks, description, sectionName },
  setViewTaskVisible,
}) => {
  return (
    <Droppable droppableId={sectionId}>
      {({ droppableProps, innerRef, placeholder }) => (
        <div className="dnd-column-styled">
          <div className="section-heading">
            <PageSectionTitle title={sectionName} />
            <PageSubTitleTitle title={description} />
          </div>
          <div className="dnd-column-list" {...droppableProps} ref={innerRef}>
            {tasks.map((task, index) => (
              <DnDItem key={task.id} {...{ task }} {...{ index }} {...{ setViewTaskVisible }} />
            ))}
            {placeholder}
          </div>
        </div>
      )}
    </Droppable>
  );
};

export default DnDColumn;
