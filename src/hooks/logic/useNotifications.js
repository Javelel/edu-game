import { useEffect } from 'react';

export default function useNotifications({
  problemQueue,
  setProblemQueue,
  showProblemNotification,
  setShowProblemNotification,
  setProblemNotificationMessage,

  taskQueue,
  setTaskQueue,
  showTaskNotification,
  setShowTaskNotification,
  setTaskNotificationMessage,
}) {
  useEffect(() => {
    if (!showProblemNotification && problemQueue.length > 0) {
      const nextMessage = problemQueue[0];
      setProblemNotificationMessage(nextMessage);
      setShowProblemNotification(true);
      setProblemQueue((prevQueue) => prevQueue.slice(1));
    }
  }, [
    problemQueue,
    showProblemNotification,
    setProblemNotificationMessage,
    setShowProblemNotification,
    setProblemQueue,
  ]);

  useEffect(() => {
    if (!showTaskNotification && taskQueue.length > 0) {
      const nextMessage = taskQueue[0];
      setTaskNotificationMessage(nextMessage);
      setShowTaskNotification(true);
      setTaskQueue((prevQueue) => prevQueue.slice(1));
    }
  }, [
    taskQueue,
    showTaskNotification,
    setTaskNotificationMessage,
    setShowTaskNotification,
    setTaskQueue,
  ]);
}
