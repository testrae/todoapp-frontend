import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { ToDoItemsComponent } from './to-do-items.component';

describe('ToDoItemsComponent', () => {
  let component: ToDoItemsComponent;
  let fixture: ComponentFixture<ToDoItemsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
          imports: [HttpClientModule],
          providers: []
        })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ToDoItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
