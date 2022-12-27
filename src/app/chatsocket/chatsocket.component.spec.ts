import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatsocketComponent } from './chatsocket.component';

describe('ChatsocketComponent', () => {
  let component: ChatsocketComponent;
  let fixture: ComponentFixture<ChatsocketComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChatsocketComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChatsocketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
