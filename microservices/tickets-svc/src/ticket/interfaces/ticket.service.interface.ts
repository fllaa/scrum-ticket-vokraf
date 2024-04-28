export interface ITicketService {
  create(data: any, userId: string): Promise<any>;
  get(id: string): Promise<any>;
  list(): Promise<any>;
  listByUser(userId: string): Promise<any>;
  summary(userId: string): Promise<any>;
  performance(userId: string): Promise<any>;
  update(data: any): Promise<any>;
  addAssignee(id: string, assigneeId: string, userId: string): Promise<any>;
  changeAssignee(
    id: string,
    oldAssigneeId: string,
    newAssigneeId: string,
    userId: string,
  ): Promise<any>;
  removeAssignee(id: string, assigneeId: string, userId: string): Promise<any>;
  delete(id: string): Promise<any>;
  _getUser(userId: string): Promise<any>;
  _generateHistoryData(action: string, userId: string, values: string[]): any;
}
