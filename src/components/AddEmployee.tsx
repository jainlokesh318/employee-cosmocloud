import React, { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Contact, Employee } from '../models/employee';
import { useEmployee } from '../hooks/useEmployee';

const AddEmployee: React.FC = () => {
  const [name, setName] = useState<string>('');
  const [line1, setLine1] = useState<string>('');
  const [city, setCity] = useState<string>('');
  const [country, setCountry] = useState<string>('');
  const [zipcode, setZipcode] = useState<string>('');
  const [contactMethods, setContactMethods] = useState<Contact[]>([{ contact_method: 'email', value: '' }]);
  const{ loading, addEmployeeData, fetchEmployeeData, editEmployeeData } = useEmployee();
  const navigate = useNavigate();
  const {id} = useParams();

  const setEmployeeData = async (id:string) => {
    const res = await fetchEmployeeData(id);
    setName(res.name);
    setContactMethods(res.contactMethods)
    setCity(res.address.city)
    setCountry(res.address.country)
    setZipcode(res.address.zipcode)
    setLine1(res.address.line1)
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newEmployee: Omit<Employee, '_id'> = {
      name,
      address: { line1, city, country, zipcode },
      contactMethods,
    };

    if(id){
        await editEmployeeData(id, newEmployee)
        navigate(`/employee/${id}`)
    }else{
        const res = await addEmployeeData(newEmployee)
        navigate(`/employee/${res.id}`)
    }
   
  };

  const handleContactChange = (index: number, field: keyof Contact, value: string) => {
    const newContactMethods = contactMethods.map((contactMethod, i) => {
        if(i === index){
            return {...contactMethod, [field]: value}
        }else{
            return contactMethod
        }
    })
    setContactMethods(newContactMethods);
  };

  const handleAddContact = () => {
    setContactMethods([...contactMethods, { contact_method: 'email', value: '' }]);
  };

  useEffect(() => {
    if(id){
        setEmployeeData(id)
    }
  }, [id])

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block">Name</label>
        <input
          type="text"
          value={name}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
          className="border p-2 w-full"
        />
      </div>
      <div>
        <label className="block">Address Line 1</label>
        <input
          type="text"
          value={line1}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setLine1(e.target.value)}
          className="border p-2 w-full"
        />
      </div>
      <div>
        <label className="block">City</label>
        <input
          type="text"
          value={city}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setCity(e.target.value)}
          className="border p-2 w-full"
        />
      </div>
      <div>
        <label className="block">Country</label>
        <input
          type="text"
          value={country}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setCountry(e.target.value)}
          className="border p-2 w-full"
        />
      </div>
      <div>
        <label className="block">Zip Code</label>
        <input
          type="text"
          value={zipcode}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setZipcode(e.target.value)}
          className="border p-2 w-full"
        />
      </div>
      <div>
        <h3 className="font-bold">Contact Methods</h3>
        {contactMethods.map((contact, index) => (
          <div key={index} className="flex space-x-2 items-center">
            <select
              value={contact.contact_method}
              onChange={(e: ChangeEvent<HTMLSelectElement>) =>
                //console.log(e.target.options.selectedIndex)
             handleContactChange(index, 'contact_method', e.target.value)
              }
              className="border p-2"
            >
              <option value="email">EMAIL</option>
              <option value="phone">PHONE</option>
            </select>
            <input
              type="text"
              value={contact.value}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                handleContactChange(index, 'value', e.target.value)
              }
              className="border p-2 w-full"
            />
          </div>
        ))}
        <button
          type="button"
          onClick={handleAddContact}
          className="bg-blue-500 text-white px-4 py-2 rounded mt-2"
        >
          Add Contact Method
        </button>
      </div>
      <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded" disabled={loading}>
        {loading ? 'Submitting...' : 'Submit'}
      </button>
    </form>
  );
};

export default AddEmployee;
