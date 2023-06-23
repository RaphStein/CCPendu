import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HangmanTryComponent } from './hangman-try.component';
import { By } from '@angular/platform-browser';
import { HangmanService } from 'src/app/services/hangman.service';

describe('HangmanTryComponent', () => {
  let component: HangmanTryComponent;
  let fixture: ComponentFixture<HangmanTryComponent>;
  let service: HangmanService;
  const mockEvent: Event = <Event><any>{
    target: {
        value: 42      
    }
  };
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HangmanTryComponent]
    });
    fixture = TestBed.createComponent(HangmanTryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    service = TestBed.inject(HangmanService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call onLetterClick when button .letter is clicked', () => {
    spyOn(component, 'onLetterClick')
    const boutonsLettres = fixture.debugElement.queryAll(By.css('.letter'))

    expect(boutonsLettres.length).toEqual(26);

    for (let i = 0; i < boutonsLettres.length; i++) {
      boutonsLettres[i]
      .triggerEventHandler('click', { preventDefault: () => {return;} });
      
      expect(component.onLetterClick).toHaveBeenCalled();
    }
  });
  it('should call hangmanService.tryLetter when onLetterClick is called', () => {
    spyOn(service, 'tryLetter')
    component.onLetterClick(mockEvent);
    
    expect(service.tryLetter).toHaveBeenCalled();
  });
  
  
  it('should call onNewGameClick when button .new-game is clicked', () => {
    spyOn(component, 'onNewGameClick')
    const boutonsNewGame = fixture.debugElement.query(By.css('.new-game'))

    boutonsNewGame.triggerEventHandler('click', { preventDefault: () => {return;} });
      
    expect(component.onNewGameClick).toHaveBeenCalled();
  })


  it('should call hangmanService.newGame when onNewGameClick is called', () => {
    spyOn(service, 'newGame')
    component.onNewGameClick();

    expect(service.newGame).toHaveBeenCalled();
  });  
});
