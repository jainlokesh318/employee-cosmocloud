import { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Contact, Employee } from '../models/employee';
import { useEmployee } from '../hooks/useEmployee';
import { ArrowLeftIcon, PlusCircleIcon } from '@heroicons/react/16/solid';

export default function AddEmployee() {
  const [name, setName] = useState<string>('');
  const [line1, setLine1] = useState<string>('');
  const [city, setCity] = useState<string>('');
  const [country, setCountry] = useState<string>('');
  const [zipcode, setZipcode] = useState<string>('');
  const [contactMethods, setContactMethods] = useState<Contact[]>([{ contact_method: 'email', value: '' }]);
  const { loading, addEmployeeData, fetchEmployeeData, editEmployeeData } = useEmployee();
  const navigate = useNavigate();
  const { id } = useParams();

  const setEmployeeData = async (id: string) => {
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

    if (id) {
      await editEmployeeData(id, newEmployee)
      navigate(`/employee/${id}`)
    } else {
      const res = await addEmployeeData(newEmployee)
      navigate(`/employee/${res.id}`)
    }

  };

  const handleContactChange = (index: number, field: keyof Contact, value: string) => {
    const newContactMethods = contactMethods.map((contactMethod, i) => {
      if (i === index) {
        return { ...contactMethod, [field]: value }
      } else {
        return contactMethod
      }
    })
    setContactMethods(newContactMethods);
  };

  const handleAddContact = () => {
    setContactMethods([...contactMethods, { contact_method: 'email', value: '' }]);
  };

  useEffect(() => {
    if (id) {
      setEmployeeData(id)
    }
  }, [id])

  return (
    <div>
      <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-t-lg flex justify-between items-center">
        <ArrowLeftIcon className="size-5 cursor-pointer" onClick={() => navigate('/')} />
        <div className="flex-grow text-center">
          <span>Employee Details Form</span>
        </div>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4 text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-900 p-4 shadow-lg text-sm rounded-b-lg">
        <div className='flex flex-col gap-2'>
          <label className="text-left">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
            className="p-2 w-full focus:outline-none rounded-lg"
          />
        </div>
        <div className='grid grid-cols-2 gap-4'>
          <div className='flex flex-col gap-2'>
            <label className="block text-left">Address Line 1</label>
            <input
              type="text"
              value={line1}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setLine1(e.target.value)}
              className="p-2 w-full focus:outline-none rounded-lg"
            />
          </div>
          <div className='flex flex-col gap-2'>
            <label className="text-left">City</label>
            <input
              type="text"
              value={city}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setCity(e.target.value)}
              className="p-2 w-full focus:outline-none rounded-lg"
            />
          </div>
          <div className='flex flex-col gap-2'>
            <label className="text-left">Country</label>
            <input
              type="text"
              value={country}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setCountry(e.target.value)}
              className="p-2 w-full focus:outline-none rounded-lg"
            />
          </div>
          <div className='flex flex-col gap-2'>
            <label className="text-left">Zip Code</label>
            <input
              type="text"
              value={zipcode}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setZipcode(e.target.value)}
              className="p-2 w-full focus:outline-none rounded-lg"
            />
          </div>
        </div>
        <div className='flex flex-col gap-2'>
          <div className='flex gap-2 items-center'>
            <h3>Contact Methods</h3>
            <PlusCircleIcon className='size-5 cursor-pointer' onClick={handleAddContact} />
          </div>
          <div className='grid grid-cols-2 gap-4'>
            {contactMethods.map((contact, index) => (
              <div key={index} className="flex space-x-2 items-center w-full">
                <select
                  value={contact.contact_method}
                  onChange={(e: ChangeEvent<HTMLSelectElement>) => handleContactChange(index, 'contact_method', e.target.value)}
                  className="p-2 rounded-lg"
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
                  className="p-2 w-full focus:outline-none rounded-lg"
                />
              </div>
            ))}
          </div>
        </div>
        <button type="submit" className="bg-gray-600 hover:bg-gray-700 border border-stone-800 text-white px-4 py-2 rounded-lg" disabled={loading}>
          {loading ? 'Loading...' : 'Submit'}
        </button>
      </form>
    </div>
  );
};