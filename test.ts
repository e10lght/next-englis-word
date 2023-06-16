export {};
type Move = any;
type CareerChange = any;
type Death = any;
type Birth = any;
type Marriage = any;
type LifeEventType = Marriage | Birth | Death | CareerChange | Move | Despair;

const unKnown = 99999;
function effort(): number {
  return Math.random() * 200;
}

interface Despair {
  reason: string;
}

interface LifeEvent<T> {
  year: number;
  details: string;
}

interface Person<T extends LifeEventType> {
  name: string;
  readonly birth: Date;
  death?: Date;
  lifeEvents?: LifeEvent<T>[];
  selfWorth: boolean;
  expectation: number;
  experienceDespair: () => void;
}

const KIRA_ITO: Person<Despair> = {
  name: "kira ito",
  birth: new Date("1997-08-19"),
  selfWorth: false,
  expectation: unKnown,

  experienceDespair: function () {
    while (!this.selfWorth) {
      const achievement = effort();

      if (achievement >= this.expectation) {
        this.selfWorth = true;
      }
    }
  },
};

KIRA_ITO.experienceDespair();
