import { TestBed, inject } from '@angular/core/testing';
import { ToDoItemsService } from './to-do-items.service';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ToDoItem } from './to-do-item';


//Testing of EmployeeService
describe('ToDoItemsService', () => {
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  let empService: ToDoItemsService;

  beforeEach(() => {
    //Configures testing app module
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        ToDoItemsService
      ]
    });

    //Instantaites HttpClient, HttpTestingController and EmployeeService
    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
    empService = TestBed.inject(ToDoItemsService);
  });

  afterEach(() => {
    httpTestingController.verify(); //Verifies that no requests are outstanding.
  });

  describe('#getAllEmployees', () => {
    let expectedEmps: ToDoItem[];

    beforeEach(() => {
      //Dummy data to be returned by request.
      expectedEmps = [
        { text: "101", done: false },
        { text: "102", done: false },
      ] as ToDoItem[];
    });

    //Test case 1
    it('should return expected todos', () => {
      empService.getToDoItems().subscribe(
        emps => expect(emps).toEqual(expectedEmps, 'should return expected todos'),
        fail
      );

      const req = httpTestingController.expectOne(empService.ToDoItemUrl);
      expect(req.request.method).toEqual('GET');

      req.flush(expectedEmps); //Return expectedEmps
    });

    //Test case 2
    it('should be OK returning no todos', () => {
      empService.getToDoItems().subscribe(
        emps => expect(emps.length).toEqual(0, 'should have empty todos array'),
        fail
      );

      const req = httpTestingController.expectOne(empService.ToDoItemUrl);
      req.flush([]); //Return empty data
    });

    //Test case 3
    it('should turn 404 error into an empty todos result', () => {
      empService.getToDoItems().subscribe(
        emps => expect(emps.length).toEqual(0, 'should return empty todos array'),
        fail
      );

      const req = httpTestingController.expectOne(empService.ToDoItemUrl);

      const msg = '404 error';
      req.flush(msg, { status: 404, statusText: 'Not Found' }); //Return error
    });

    //Test case 4
    it('should return expected todos when called multiple times', () => {
      empService.getToDoItems().subscribe();
      empService.getToDoItems().subscribe(
        emps => expect(emps).toEqual(expectedEmps, 'should return expected todos'),
        fail
      );

      const requests = httpTestingController.match(empService.ToDoItemUrl);
      expect(requests.length).toEqual(2, 'calls to getAllEmployees()');

      requests[0].flush([]); //Return Empty body for first call
      requests[1].flush(expectedEmps); //Return expectedEmps in second call
    });
  });
});
