import React, { Fragment, useCallback } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import AddTaskModal from '../addTaskModal';
import { taskService } from '../../services/tasks';

import DnDColumn from '../dndColumn';
import SeeTaskModal from '../seeTaskModal';
import './dndSection.scss';
import { useDispatch } from 'react-redux';
import { setNotificationDataAction } from '../../store/actions/globalAction';

/**
 * 
 * @param {*} param0 
 * @returns dnd section html
 */
const DnDSection = ({
  columns,
  setColumns,
  addNewColumnHandler,
  addColumModal,
  setAddColumnModal,
  viewTaskVisible,
  setViewTaskVisible,
  teamMembers,
  statuses,
  projectId,
}) => {
  const dispatch = useDispatch();
  const handleNotification = useCallback(
    (data) => dispatch(setNotificationDataAction(data)),
    [dispatch],
  );

  const onDragEnd = async ({ source, destination }) => {
    if (
      destination === undefined ||
      destination === null ||
      (source.droppableId === destination.droppableId && destination.index === source.index)
    )
      return null;
    const start = columns[source.droppableId];
    const end = columns[destination.droppableId];

    if (start === end) {
      const newList = start.tasks.filter((_, idx) => idx !== source.index);
      newList.splice(destination.index, 0, start.tasks[source.index]);
      const newCol = {
        id: start.id,
        sectionName: start.sectionName,
        description: start.description,
        tasks: newList,
      };
      setColumns({ ...columns, ...{ [newCol.id]: newCol } });
    } else {
      let taskId = '';
      start.tasks.forEach((element, _idx) => {
        if (source.index === _idx) {
          taskId = element.id;
        }
      });
      const newStartList = start.tasks.filter((_, idx) => idx !== source.index);
      const newStartCol = {
        id: start.id,
        sectionName: start.sectionName,
        description: start.description,
        tasks: newStartList,
      };
      const newEndList = end.tasks;
      newEndList.splice(destination.index, 0, start.tasks[source.index]);
      const newEndCol = {
        id: end.id,
        sectionName: end.sectionName,
        description: end.description,
        tasks: newEndList,
      };
      await taskService.updateTaskDetailsAPI({ id: taskId, data: { status: newEndCol.id } }).then();
      handleNotification('Task updated Successfully!');
      setColumns({
        ...columns,
        ...{ [newStartCol.id]: newStartCol, [newEndCol.id]: newEndCol },
      });
    }
    return null;
  };

  return (
    <Fragment>
      <div className="dnd-main-area">
        <DragDropContext onDragEnd={onDragEnd}>
          <div className="dnd-columns">
            {Object.entries(columns).map(([key, section]) => (
              <DnDColumn
                sectionId={key}
                {...{ section }}
                {...{ key }}
                {...{ setViewTaskVisible }}
              />
            ))}
          </div>
        </DragDropContext>
        <button onClick={() => setAddColumnModal(true)}>Add</button>
      </div>
      {addColumModal && (
        <AddTaskModal
          addTaskHander={addNewColumnHandler}
          cancleHandler={() => setAddColumnModal(false)}
        />
      )}
      {viewTaskVisible && (
        <SeeTaskModal
          cancleHandler={() => setViewTaskVisible(null)}
          data={viewTaskVisible}
          {...{ teamMembers }}
          {...{ statuses }}
          {...{ projectId }}
        />
      )}
    </Fragment>
  );
};

export default DnDSection;
