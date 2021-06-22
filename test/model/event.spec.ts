import { Departure } from '../../src/2domain/model/departure'



describe('Event creation', () => {

    it('should format the date correctly', () => {

        let departure = new Departure({
            time: '17:10',
            code: 'BA3289',
            operator: 'BA',
            to: 'London City',
            status: 'Scheduled ',
        })

        expect(departure.time).toEqual("2021-06-22T17:10")
    })

})
