import _ from 'lodash'

export default class Flow {

  public state: string = 'initial';

  private previousSteps = [];
  private nextSteps = [];


  public showOptions = false;


  get nextStep() {

    return {data: this.nextSteps[1]}

  }

  get currentStep() {
    return {options: false, data: this.nextSteps[0]}
  }

  goNext() {
    const curr = _.head(this.nextSteps)

    this.nextSteps = _.drop(this.nextSteps)

    this.previousSteps = [...this.previousSteps, curr]

    return true;
  }


}