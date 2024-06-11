import './jobList.css';
import { useState, useEffect } from 'react';

const JobList = () => {
  const [jobs, setJobs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [jobsPerPage] = useState(6);

  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [isFormValid, setIsFormValid] = useState(false);
  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [phoneError, setPhoneError] = useState('');

  const handleShowPopup = job => {
    setSelectedJob(job);
    setIsPopupVisible(true);
  };

  const handleClosePopup = () => {
    setIsPopupVisible(false);
    setSelectedJob(null);
  };

  const [isPopupForm, setIsPopupForm] = useState(false);

  function handlePopupForm() {
    setIsPopupForm(true);
    const popupForm = document.querySelector('.popup-form');
    if (popupForm) {
      popupForm.style.display = 'block';
    }
  }

  const handleClosePopupForm = () => {
    setIsPopupForm(false);
    setName('');
    setEmail('');
    setPhone('');
    setNameError('');
    setEmailError('');
    setPhoneError('');
    setIsFormValid(false);
  };

  useEffect(() => {
    fetch('/data/example_1.xml')
      .then(response => response.text())
      .then(xmlString => {
        const parser = new DOMParser();
        const xmlDocument = parser.parseFromString(xmlString, 'text/xml');
        const parsedVacancies = xmlDocument.querySelectorAll('vacancy');

        const parsedJobs = Array.from(parsedVacancies).map(vacancy => {
          const jobName = vacancy.querySelector('job-name').textContent;
          const description = vacancy.querySelector('description').innerHTML;
          const salary = vacancy.querySelector('salary').textContent;

          return {
            jobName,
            description,
            salary
          };
        });

        setJobs(parsedJobs);
      })
      .catch(error => console.error('Error fetching jobs:', error));
  }, []);

  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = jobs.slice(indexOfFirstJob, indexOfLastJob);

  const paginate = pageNumber => setCurrentPage(pageNumber);

  const handleNameChange = event => {
    setName(event.target.value);
    validateForm();
    if (event.target.value.length < 3) {
      setNameError('Имя пользователя должно содержать не менее 2 символов');
    } else {
      setNameError('');
    }
  };

  const handleEmailChange = event => {
    setEmail(event.target.value);
    validateForm();
    if (event.target.value.length < 3) {
      setEmailError('Email должен содержать не менее 3 символов');
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setEmailError('Некорректный формат email');
    } else {
      setEmailError('');
    }
  };

  const handlePhoneChange = event => {
    setPhone(event.target.value);
    validateForm();
    if (event.target.value.length < 11) {
      setPhoneError(
        'Номер телефона должен состоять только из цифр и содержать не менее 11 символов'
      );
    } else if (!/^\d{10}$/.test(phone.trim())) {
      setPhoneError('Некорректный формат email');
    } else {
      setPhoneError('');
    }
  };

  const validateForm = () => {
    const nameValid = /^[a-zA-Zа-яА-Я ]+$/.test(name.trim());
    const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
    const phoneValid = /^\d{10}$/.test(phone.trim());
    setIsFormValid(nameValid && emailValid && phoneValid);
  };

  return (
    <>
      <div className="job-list">
        <h2 className="job-list__title">Список вакансий</h2>
        <ul className="jobList">
          {currentJobs.map((job, index) => (
            <li key={index} className="job-item">
              <h3>{job.jobName}</h3>
              <p>{job.salary}</p>
              <button onClick={() => handleShowPopup(job)}>Подробнее</button>
            </li>
          ))}
        </ul>
        <div className="pagination">
          {Array.from({ length: Math.ceil(jobs.length / jobsPerPage) }, (_, i) => i + 1).map(
            pageNumber => (
              <button
                key={pageNumber}
                onClick={() => paginate(pageNumber)}
                className={currentPage === pageNumber ? 'active' : ''}
              >
                {pageNumber}
              </button>
            )
          )}
        </div>

        {isPopupVisible && (
          <div className="popup">
            <div className="popup__content">
              <button className="popup__close" onClick={handleClosePopup}>
                X
              </button>
              <h3>{selectedJob?.jobName}</h3>
              <p dangerouslySetInnerHTML={{ __html: selectedJob?.description }}></p>
              <button className="popup-button" onClick={handlePopupForm}>
                Откликнуться
              </button>
            </div>
          </div>
        )}
        {isPopupForm && (
          <div className="popup">
            <form className="popup-form">
              <button className="popup__close closeForm" onClick={handleClosePopupForm}>
                X
              </button>
              <h3>Ваши контактные данные</h3>
              <input
                type="text"
                value={name}
                onChange={handleNameChange}
                className="popup-input"
                placeholder="ФИО"
                minLength={2}
                required
              />
              {nameError && <div className="error">{nameError}</div>}
              <input
                type="email"
                value={email}
                onChange={handleEmailChange}
                className="popup-input"
                placeholder="Email"
                required
              />
              {emailError && <div className="error">{emailError}</div>}
              <input
                type="tel"
                value={phone}
                onChange={handlePhoneChange}
                className="popup-input"
                placeholder="Номер телефона"
              />
              {phoneError && <div className="error">{phoneError}</div>}
              <button
                type="submit"
                className="popup-button sendButton"
                onClick={() => {
                  handleClosePopupForm();
                }}
                disabled={!isFormValid}
              >
                Отправить
              </button>
            </form>
          </div>
        )}
      </div>
    </>
  );
};

export default JobList;

// return (
//   <div className="jobList">
//     {jobs.map((job, index) => (
//       <div className="jobList__item" key={index}>
//         <h3>{job.jobName}</h3>
//         <p>{job.salary}</p>
//         <button onClick={() => handlePopup(job.description)}>Подробнее</button>
//       </div>
//     ))}
//     <div className="popup">{popupContent}</div>
//   </div>
// );

// {jobs.map((job, index) => (
//   <div className="jobList__item" key={index}>
//     <h3>{job.jobName}</h3>
//     <p>{job.salary}</p>
//     <button onClick={() => handleShowPopup(job)}>Подробнее</button>
//   </div>
// ))}
