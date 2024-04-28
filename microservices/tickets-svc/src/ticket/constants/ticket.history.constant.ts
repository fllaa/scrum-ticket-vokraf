import { TICKET_HISTORY_ACTION_ENUM } from 'src/ticket/constants/ticket.history.enum.constant';

export const TICKET_HISTORY_ACTION_TEXT = {
  CREATE: 'Ticket created by $1',
  ADD_ASSIGNEE: '$1 added $2 as assignee',
  CHANGE_ASSIGNEE: '$1 changed assignee from $2 to $3',
  REMOVE_ASSIGNEE: '$1 removed $2 as assignee',
  UPDATE_STATUS: '$1 updated status from $2 to $3',
  UPDATE_POINTS: '$1 updated points to $2',
  UPDATE_DUE_DATE: '$1 updated due date to $2',
  DELETE: 'Ticket deleted by $1',
};

export const TICKET_HISTORY_PROPERTY_ACTION = {
  points: TICKET_HISTORY_ACTION_ENUM.UPDATE_POINTS,
  status: TICKET_HISTORY_ACTION_ENUM.UPDATE_STATUS,
  dueDate: TICKET_HISTORY_ACTION_ENUM.UPDATE_DUE_DATE,
};
