import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HangmanDisplayComponent } from './hangman-display.component';
import { HangmanService } from 'src/app/services/hangman.service';
import { By } from '@angular/platform-browser';
import { signal } from '@angular/core';

describe('HangmanDisplayComponent', () => {
  let component: HangmanDisplayComponent;
  let fixture: ComponentFixture<HangmanDisplayComponent>;
  const mockedHangmanService = {
    triedLetters: signal<string[]>([]),
    failedTries: signal(0),
    wordToFind: "",
    wordMasked: signal(""),
    isPlaying: signal(true),
  }
  
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HangmanDisplayComponent], 
      providers: [{provide: HangmanService, useValue: mockedHangmanService}]
    });
    fixture = TestBed.createComponent(HangmanDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    //service = TestBed.inject(HangmanService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should change the image', () => {
    for (let i = 1; i < 8; i++) {
      const imgAvant = fixture.debugElement.query(By.css('img'))?.nativeElement as HTMLElement
      const srcAvant = imgAvant.getAttribute('src');
      mockedHangmanService.failedTries.set(i);
      fixture.detectChanges();
      const imgApres = fixture.debugElement.query(By.css('img'))?.nativeElement as HTMLElement
      const srcApres = imgApres.getAttribute('src');
      expect(srcAvant).not.toEqual(srcApres)
    }
  });

});
