import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router';

import CalendarController from '../../scripts/Calendar/CalendarController';
import Container from '../Container/Container';
import DateFrame from '../Headers/DateFrame';
import styles from './DatePage.module.css';

export default function DatePage() {
  const { year, month, date } = useParams();
  const [tasks, setTasks] = useState([]);
  let navigate = useNavigate();

  useEffect(() => {
    if (new Date(`${year}-${month}-${date}`).toString() === 'Invalid Date') {
      navigate(`/year/${year}/month/${month}/date/${date}/error404`);
    }

    async function getDays() {
      const array_tasks = await CalendarController.getDayTasks(
        year,
        month,
        date
      );
      setTasks(array_tasks);
    }
    getDays();
  }, [date, month, navigate, year]);

  function selectTask(id) {
    navigate(`/task/${id}`);
  }

  return (
    <DateFrame>
      <Container>
        <div className={styles.counter_block}>{tasks.length} tasks</div>
        <ul className={styles.array}>
          {tasks.map((task, task_i) => {
            const start_date = new Date(task.start_date);

            let hours = start_date.getHours();
            hours = hours < 10 ? `0${hours}` : `${hours}`;

            let minutes = start_date.getMinutes();
            minutes = minutes < 10 ? `0${minutes}` : `${minutes}`;

            return (
              <li
                key={task_i}
                className={styles.array_element}
                onClick={(event) => selectTask(task.id)}
              >
                {task.completed ? (
                  <span className={styles.task_completed_circle}></span>
                ) : (
                  <span className={styles.task_not_completed_circle}></span>
                )}
                <span className={styles.time}>
                  ({hours}:{minutes})
                </span>
                <span>{task.title}</span>
              </li>
            );
          })}
        </ul>
      </Container>
    </DateFrame>
  );
}
