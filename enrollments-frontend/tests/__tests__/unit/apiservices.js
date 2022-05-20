/*@testCases: api services tests
 *@testType: unit test
 *@testCategory: simple
 *@author: saladinjake victor
 *@company: Ficticious EMS
 *@date" 5/20/2022
*/
import {
 loginUser,
 registerLearner,
 registerInstructor
} from " enterprise-app/core/api/services/auth"

let data, res;
beforeAll(() => {});
afterAll(() => {});

describe('App Component', () => {
	beforeEach(() => {
	   data ={
	   	 email:"user@ems.com",
	   	 password:"secret"
	   }
	});
	afterEach(() => {
	   data ={} 
	});

  it('should login successful', async () => {
    res = await loginUser(data);
    expect(res).toBeDefined()
    expect(res.data).toBeTruthy()
    expect(res.data).not.toBeNull()
    expect(res.data.id).not.toBeGreaterThan(0) //toEqual toBe toMatch  
    expect(res.data).not.toContain("token")
    expect(res.data).not.toContain("user")
  });
  it('should register student successfully', () => {
   res = await loginUser(data);
    expect(res).to.have.property("email");
  });
  it('should register instructor successfully', () => {
   res = await loginUser(data);
    expect(res).to.have.property("email");
  });


  it('should throw or fail login', () => {
   res = await loginUser(data);
    expect(res).toThrow();
  });
});