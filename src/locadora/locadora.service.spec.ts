import { Test, TestingModule } from '@nestjs/testing';
import { ServiceError } from '../errors/service-error';
import { Locadora } from './entities/locadora.entity';
import { LocadoraService } from './locadora.service';

describe('LocadoraService', () => {
  let locatorService: LocadoraService;
  const mockLocator = {
    id: 1,
    trade_name: "TROCAR LTDA",
    corporate_name: "TROCAR",
    cnpj: "14142412",
    email: "trocar@gmail.com",
    telephone: "31984814"
  }
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [{
        provide: LocadoraService,
        useValue: {
          findOne: jest.fn(),
          findAll: jest.fn(),
          create: jest.fn(),
          remove: jest.fn(),
          update: jest.fn()
        }
      }],
    }).compile();

    locatorService = module.get<LocadoraService>(LocadoraService);
  });


  it('should return one locator', async () => {
    //Arrange

    jest.spyOn(locatorService, 'findOne').mockResolvedValueOnce(mockLocator)

    //Act 
    const result = await locatorService.findOne(1)

    //Assert
    expect(result).toBeDefined();
    expect(result).toMatchObject<Locadora>(mockLocator)
    expect(locatorService.findOne).toBeCalledTimes(1)
    expect(result instanceof ServiceError).not.toBeTruthy()

  })

  it('should return an array of locators', async () => {
    // Arragne
    jest.spyOn(locatorService, 'findAll').mockResolvedValue([
      mockLocator
    ])

    // Act
    const result = await locatorService.findAll()

    // Assert
    expect(result).toBeDefined()
    expect(result).toEqual(
      expect.arrayContaining([
        expect.objectContaining(mockLocator)
      ])
    )
    expect(result instanceof ServiceError).not.toBeTruthy()

  })

  it('should create an locator', async () => {
    // Arragne
    jest.spyOn(locatorService, 'create').mockResolvedValue(mockLocator)

    // Act
    const result = await locatorService.create(mockLocator)

    // Assert
    expect(result).toBeDefined()
    expect(locatorService.create).toBeCalledTimes(1)
    expect(result).toMatchObject(mockLocator)
    expect(result instanceof ServiceError).not.toBeTruthy()

  })

  it('should remove an locator', async () => {
    // Arragne
    jest.spyOn(locatorService, 'remove').mockResolvedValue({
      statusCode: 200,
      message: "Deleted."
    })

    // Act
    const result = await locatorService.remove(1)

    // Assert
    expect(locatorService.remove).toBeCalledWith(1)
    expect(result).toMatchObject({
      "statusCode": 200,
      "message": "Deleted."
    })
    expect(result instanceof ServiceError).not.toBeTruthy()

  })

  it('should update an locator', async () => {
    // Arragne
    jest.spyOn(locatorService, 'update').mockResolvedValue(null)

    // Act
    const result = await locatorService.update(1, {
      email: "mock@gmail.com",
      telephone: "31999196707"
    })

    // Assert

    expect(locatorService.update).toBeCalledWith(1, {
      email: "mock@gmail.com",
      telephone: "31999196707"
    })
    expect(result instanceof ServiceError).not.toBeTruthy()

  })
});
