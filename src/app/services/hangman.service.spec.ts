import { TestBed } from '@angular/core/testing';

import { HangmanService  } from './hangman.service';
import { RandomWordGeneratorService } from './random-word-generator.service';
import { Serializer } from '@angular/compiler';

describe('HangmanService', () => {
  let service: HangmanService;

 
  beforeEach(() => {
    TestBed.configureTestingModule({
    });
    service = TestBed.inject(HangmanService);
    
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  describe('generateMask', () => {
    it('should create a mask for the word angular', () => {
      
      service.wordToFind = "angular"
      service['generateMask']();
      expect(service.wordMasked()).toBe("_______")
    });
    it('should create a mask for the word angular with a', () => {
      
      service.wordToFind = "angular"
      service.triedLetters.set(['a'])
      service['generateMask']();
      expect(service.wordMasked()).toBe("a____a_")
    });


  });
  describe('tryLetter', () => {
    it('should create a new mask for letter a', () => {
      const privateSpy = spyOn<any>(service, 'generateMask');
      service.wordToFind = "angular"
      service.tryLetter('a')

      expect(privateSpy).toHaveBeenCalled()
    });
    it('should not create a new mask for letter b', () => {
      const privateSpy = spyOn<any>(service, 'generateMask');
      service.wordToFind = "angular"
      service.tryLetter('b')
      expect(privateSpy).not.toHaveBeenCalled()
    });

    it('should call checkWinConditions', () => {
      const privateSpy = spyOn<any>(service, 'checkWinConditions'); 
      service.wordToFind = "angular"
      service.tryLetter('b')
      expect(privateSpy).toHaveBeenCalled();
    });


  });
  describe('checkWinConditions', () => {
    it('should end the game, lost', () => {
      service.failedTries.set(8);
      service['checkWinConditions']();
      expect(service.isPlaying()).toBeFalse();
    });
    it('should continue the game', () => {
      service.newGame();
      service.failedTries.set(2)
      service['checkWinConditions']();
      expect(service.isPlaying()).toBeTrue()
    });


  });
  describe('newGame', () => {
    it('should create new game', () => {
      
      service.wordToFind = "angular"
      service.wordMasked.set("angular")
      service.newGame()

      expect(service.triedLetters()).toEqual([])
      expect(service.failedTries()).toEqual(0)

    });


  });
});
