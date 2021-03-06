import React, { Component }     from 'react';
import { Field }                from 'redux-form';
import * as Datepicker          from '../common/Datepicker';
import * as Regex               from '../constants/Regex';
import * as Patient             from '../constants/Patient';
import { cepSearch }            from '../services/requests/Cep';
import { uploadPatientPicture } from '../services/requests/Upload';
import Inputmask                from 'inputmask';
import Webcam                   from 'react-webcam';

const INITIAL_STATE = {
  showRgIssuingAgency: false,
  showNationalityOther: false,
  showPlaceOfBirthOther: false,
  showWebcam: false,
  shouldResetSelects: false,
  shouldResetCounters: false,
  shouldResetTooltips: false,
  shouldResetModals: false
}

class FormPatient extends Component {
  render() {
    const { method, action, handleSubmit, doctors }       = this.props;
    const { submitCallback }                              = this.props;
    const { showNationalityOther, showPlaceOfBirthOther } = this.state;
    const { showRgIssuingAgency }                         = this.state;

    const formButtons = this.renderFormButtons();
    let renderDoctorField;

    if (doctors && doctors.length > 0) {
      renderDoctorField = this.renderDoctorField();
    }

    return (
      <form
        onSubmit={ handleSubmit(submitCallback) }
      >
        { renderDoctorField }
        <h5 className="section">Informações pessoais</h5>
        <div className="row">
          <Field
            id="picture"
            name="picture"
            label={ I18n.t('patients.form.picture_label') }
            className="col s6 m4 l2 offset-s3 offset-m4 offset-l5"
            autoComplete="off"
            reference={ this.pictureInputRef }
            fileInputRef={ this.pictureFileRef }
            uploadBtnRef={ this.pictureUploadButtonRef }
            webcamBtnRef={ this.pictureWebcamButtonRef }
            webcamModalRef={ this.pictureWebcamModalRef }
            onChange={ this.onPictureSelect.bind(this) }
            imageAlt={ I18n.t('patients.new.picture_alt') }
            onImageError={ this.onPictureError }
            onUploadClick={ this.onUploadButtonClick.bind(this) }
            onWebcamClick={ this.onWebcamButtonClick.bind(this) }
            webcamModalId="pictureWebcamModal"
            component={ this.renderImageField.bind(this) }
          />
        </div>
        <div className="row">
          <Field
            id="name"
            name="name"
            type="text"
            label={ I18n.t('patients.attributes.name') }
            className="col l8 s12"
            autoComplete="off"
            maxLength="100"
            reference={ this.nameInputRef }
            component={ this.renderField }
          />
          <Field
            id="date_of_birth"
            name="date_of_birth"
            type="text"
            label={ I18n.t('patients.attributes.date_of_birth') }
            className="col l4 m6 s12"
            autoComplete="off"
            reference={ this.dateOfBirthInputRef }
            button={{ iconClass: 'fas fa-calendar-alt', onClick: this.initDatepicker.bind(this) }}
            component={ this.renderField }
            onFocus={ this.onDateOfBirthFieldFocus.bind(this) }
          />
          <Field
            id="gender"
            name="gender"
            label={ I18n.t('patients.attributes.gender') }
            className="col l4 m6 s12"
            reference={ this.genderSelectRef }
            component={ this.renderSelect }
          >
            { this.renderGenderOptions() }
          </Field>
          <Field
            id="marital_status"
            name="marital_status"
            label={ I18n.t('patients.attributes.marital_status') }
            className="col l4 m6 s12"
            reference={ this.maritalStatusSelectRef }
            component={ this.renderSelect }
          >
            { this.renderMaritalStatusOptions() }
          </Field>
          <Field
            id="occupation"
            name="occupation"
            type="text"
            label={ I18n.t('patients.attributes.occupation') }
            className="col l4 m6 s12"
            autoComplete="off"
            maxLength="50"
            reference={ this.occupationInputRef }
            component={ this.renderField }
          />
          <Field
            id="cpf"
            name="cpf"
            type="text"
            label={ I18n.t('patients.attributes.cpf') }
            className="col l4 s12"
            autoComplete="off"
            reference={ this.cpfInputRef }
            component={ this.renderField }
          />
          <Field
            id="rg"
            name="rg"
            type="text"
            label={ I18n.t('patients.attributes.rg') }
            className={ showRgIssuingAgency ? 'col l4 m6 s12' : 'col l8 s12' }
            autoComplete="off"
            maxLength="50"
            reference={ this.rgInputRef }
            component={ this.renderField }
            onChange={ event => this.onRgChange(event) }
          />
          <Field
            id="rg_issuing_agency"
            name="rg_issuing_agency"
            type="text"
            label={ I18n.t('patients.attributes.rg_issuing_agency') }
            className="col l4 m6 s12"
            autoComplete="off"
            maxLength="50"
            reference={ this.rgIssuingAgencyInputRef }
            component={ this.renderField }
            style={{ display: showRgIssuingAgency ? 'block' : 'none' }}
          />
          <Field
            id="nationality"
            name="nationality"
            label={ I18n.t('patients.attributes.nationality') }
            className={ showNationalityOther ? 'col l3 m6 s12' : 'col l6 s12' }
            reference={ this.nationalitySelectRef }
            component={ this.renderSelect }
            onChange={ event => this.onNationalityChange(event) }
          >
            { this.renderNationalityOptions() }
          </Field>
          <Field
            id="nationality_other"
            name="nationality_other"
            type="text"
            label={ I18n.t('patients.form.nationality_other_label') }
            className="col l3 m6 s12"
            autoComplete="off"
            maxLength="50"
            reference={ this.nationalityOtherInputRef }
            component={ this.renderField }
            style={{ display: showNationalityOther ? 'block' : 'none' }}
          />
          <Field
            id="place_of_birth"
            name="place_of_birth"
            label={ I18n.t('patients.attributes.place_of_birth') }
            className={ showPlaceOfBirthOther ? 'col l3 m6 s12' : 'col l6 s12' }
            reference={ this.placeOfBirthSelectRef }
            component={ this.renderSelect }
            onChange={ event => this.onPlaceOfBirthChange(event) }
          >
            { this.renderPlaceOfBirthOptions() }
          </Field>
          <Field
            id="place_of_birth_other"
            name="place_of_birth_other"
            type="text"
            label={ I18n.t('patients.form.place_of_birth_other_label') }
            className="col l3 m6 s12"
            autoComplete="off"
            maxLength="50"
            reference={ this.placeOfBirthOtherInputRef }
            component={ this.renderField }
            style={{ display: showPlaceOfBirthOther ? 'block' : 'none' }}
          />
        </div>
        <h5 className="section">Contato</h5>
        <div className="row">
          <Field
            id="email"
            name="email"
            type="email"
            label={ I18n.t('patients.attributes.email') }
            className="col l6 m6 s12"
            autoComplete="off"
            maxLength="50"
            reference={ this.emailInputRef }
            component={ this.renderField }
          />
          <Field
            id="landline"
            name="landline"
            type="text"
            label={ I18n.t('patients.attributes.landline') }
            className="col l2 m6 s12"
            autoComplete="off"
            reference={ this.landlineInputRef }
            component={ this.renderField }
          />
          <Field
            id="cell_phone"
            name="cell_phone"
            type="text"
            label={ I18n.t('patients.attributes.cell_phone') }
            className="col l2 m6 s12"
            autoComplete="off"
            reference={ this.cellPhoneInputRef }
            component={ this.renderField }
          />
          <Field
            id="work_phone"
            name="work_phone"
            type="text"
            label={ I18n.t('patients.attributes.work_phone') }
            className="col l2 m6 s12"
            autoComplete="off"
            reference={ this.workPhoneInputRef }
            component={ this.renderField }
          />
        </div>
        <h5 className="section">Endereço</h5>
        <div className="row">
          <Field
            id="cep"
            name="cep"
            type="text"
            label={ I18n.t('patients.attributes.cep') }
            className="col l2 m6 s12"
            autoComplete="off"
            reference={ this.cepInputRef }
            component={ this.renderField }
            onChange={ event => this.onCepChange(event) }
          />
          <Field
            id="state"
            name="state"
            label={ I18n.t('patients.attributes.state') }
            className="col l3 m6 s12"
            reference={ this.stateSelectRef }
            component={ this.renderSelect }
          >
            { this.renderStateOptions() }
          </Field>
          <Field
            id="city"
            name="city"
            type="text"
            label={ I18n.t('patients.attributes.city') }
            className="col l3 m6 s12"
            autoComplete="off"
            maxLength="50"
            reference={ this.cityInputRef }
            component={ this.renderField }
          />
          <Field
            id="neighborhood"
            name="neighborhood"
            type="text"
            label={ I18n.t('patients.attributes.neighborhood') }
            className="col l4 m6 s12"
            autoComplete="off"
            maxLength="50"
            reference={ this.neighborhoodInputRef }
            component={ this.renderField }
          />
          <Field
            id="address"
            name="address"
            type="text"
            label={ I18n.t('patients.attributes.address') }
            className="col l6 s12"
            autoComplete="off"
            maxLength="100"
            reference={ this.addressInputRef }
            component={ this.renderField }
          />
          <Field
            id="complement"
            name="complement"
            type="text"
            label={ I18n.t('patients.attributes.complement') }
            className="col l6 s12"
            autoComplete="off"
            maxLength="100"
            reference={ this.complementInputRef }
            component={ this.renderField }
          />
        </div>
        { formButtons }
      </form>
    );
  }

  // <h5 className="section">Histórico pessoal</h5>
  // <div className="row">
  //   <p class="center-align">Ainda a decidir os campos</p>
  // </div>
  // <h5 className="section">Hábitos</h5>
  // <div className="row">
  //   <p class="center-align">Ainda a decidir os campos</p>
  // </div>
  // <h5 className="section">Histórico familiar</h5>
  // <div className="row">
  //   <p class="center-align">Ainda a decidir os campos</p>
  // </div>

  renderFormButtons() {
    const { page, restoreCallback, clearCallback, pristine } = this.props;
    const { submitting }                                     = this.props;
    let submitIcon, submitText, restoreIcon, restoreText, restoreFunc;

    if (page === 'new') {
      submitIcon = 'fas fa-plus';
      submitText = I18n.t('misc.create');
      restoreIcon = 'fas fa-eraser';
      restoreText = I18n.t('misc.clear');
      restoreFunc = clearCallback;
    } else {
      submitIcon = 'fas fa-save';
      submitText = I18n.t('misc.save');
      restoreIcon = 'fas fa-sync-alt';
      restoreText = I18n.t('misc.restore');
      restoreFunc = restoreCallback;
    }

    return (
      <div className="row">
        <div className="input-field buttons col s12">
          <button
            className="btn waves-effect waves-light bg-success"
            type="submit"
            disabled={ submitting }
          >
            <i className={ `${submitIcon} left` } />
            { submitText }
          </button>
          <button
            className="btn waves-effect waves-light bg-warning"
            type="button"
            disabled={ pristine || submitting }
            onClick={ () => this.onRestoreButtonClick(restoreFunc) }
          >
            <i className={ `${restoreIcon} left` } />
            { restoreText }
          </button>
        </div>
      </div>
    );
  }

  renderField(field) {
    const { input, id, type, label, className, disabled } = field;
    const { reference, style, maxLength, button }         = field;
    const { touched, active, error }                      = field.meta;

    const errorMessage = touched && !active ? error : '';
    const valid        = touched && !active && !errorMessage;

    const btn = button ? <i className={ `picker btn-flat waves-effect ${button.iconClass}` } onClick={ button.onClick } /> : null;

    return (
      <div
        className={ `input-field${className ? ` ${className}` : ''}${errorMessage ? ' invalid' : ''}${valid ? ' valid' : ''}` }
        style={ style }
      >
        <input
          { ...input }
          id={ id }
          type={ type }
          ref={ reference }
          maxLength={ maxLength }
          data-length={ maxLength }
          disabled={ disabled }
        />
        { btn }
        <label htmlFor={ id }>{ label }</label>
        <span className="helper-text">{ errorMessage }</span>
      </div>
    );
  }

  renderImageField(field) {
    const { input, id, label, className, disabled, imageAlt }    = field;
    const { reference, fileInputRef, onChange, onImageError }    = field;
    const { onUploadClick, onWebcamClick, uploadBtnRef }         = field;
    const { webcamBtnRef, webcamModalId, webcamModalRef }        = field;
    const { touched, active, error }                             = field.meta;

    const errorMessage = touched && !active ? error : '';
    const valid        = touched && !active && !errorMessage;

    const webcam = this.state.showWebcam ? <Webcam /> : null;

    return (
      <div className={ `image-field ${className}${errorMessage ? ' invalid' : ''}${valid ? ' valid' : ''}` }>
        <input
          { ...input }
          id={ id }
          type="hidden"
          ref={ reference }
        />
        <input
          type="file"
          className="hidden"
          ref={ fileInputRef }
          onChange={ onChange }
        />
        <label>{ label }</label>
        <div className="image-container">
          <img
            src={ `${input.value}?t=${new Date().getTime()}` }
            alt={ imageAlt }
            onError={ onImageError }
          />
          <div className="image-buttons">
            <button
              type="button"
              onClick={ onUploadClick }
              className="btn bg-info waves-effect waves-light"
              data-tooltip={ I18n.t('patients.form.pick_image') }
              data-position="top"
              ref={ uploadBtnRef }
            >
              <i className="fas fa-upload" />
            </button>
            <button
              type="button"
              onClick={ onWebcamClick }
              className="btn bg-info waves-effect waves-light"
              data-tooltip={ I18n.t('patients.form.webcam') }
              data-position="top"
              ref={ webcamBtnRef }
            >
              <i className="fas fa-camera" />
            </button>
          </div>
        </div>
        <span className="helper-text">{ errorMessage }</span>
        <div
          id={ webcamModalId }
          className="modal"
          ref={ webcamModalRef }
        >
          { webcam }
        </div>
      </div>
    );
  }

  renderSelect(field) {
    const { input, id, label, className, children, reference } = field;
    const { disabled, multiple, style }                        = field;
    const { touched, active, error }                           = field.meta;

    const errorMessage = touched && !active ? error : '';
    const valid        = touched && !active && !errorMessage;

    return (
      <div
        className={ `input-field${className ? ` ${className}` : ''}${errorMessage ? ' invalid' : ''}${valid ? ' valid' : ''}` }
        style={ style }
      >
        <select
          { ...input }
          id={ id }
          ref={ reference }
          disabled={ disabled }
          multiple={ multiple }
          onChange={ event => { input.onChange(event); input.onBlur(event) } }
        >
          { children }
        </select>
        <label>{ label }</label>
        <span className="helper-text">{ errorMessage }</span>
      </div>
    );
  }

  renderDoctorField() {
    return (
      <div className="row">
        <Field
          id="user_id"
          name="user_id"
          label="Médico(a)"
          className="col s12"
          reference={ this.userIdSelectRef }
          component={ this.renderSelect }
        >
          { this.renderUserIdOptions() }
        </Field>
      </div>
    );
  }

  renderUserIdOptions() {
    return this.props.doctors.map(doctor => {
      return (
        <option key={ doctor.id } value={ doctor.id }>{ doctor.name }</option>
      );
    });
  }

  renderGenderOptions() {
    return Patient.GENDERS.map((gender, index) => {
      const value = Patient.GENDER_VALUES[index];
      return <option key={ value } value={ value }>{ gender }</option>;
    });
  }

  renderMaritalStatusOptions() {
    return Patient.MARITAL_STATUSES.map((maritalStatus, index) => {
      const value = Patient.MARITAL_STATUS_VALUES[index];
      return <option key={ value } value={ value }>{ maritalStatus }</option>;
    });
  }

  renderNationalityOptions() {
    return Patient.NATIONALITIES.map((nationality, index) => {
      const value = Patient.NATIONALITY_VALUES[index];
      return <option key={ value } value={ value }>{ nationality }</option>;
    });
  }

  renderPlaceOfBirthOptions() {
    return Patient.STATES.map((state, index) => {
      const value = Patient.STATE_VALUES[index];
      return <option key={ value } value={ value }>{ state }</option>;
    });
  }

  renderStateOptions() {
    return Patient.STATES.map((state, index) => {
      const value = Patient.STATE_VALUES[index];
      return <option key={ value } value={ value }>{ state }</option>;
    });
  }

  constructor(props) {
    super(props);

    this.state = INITIAL_STATE;

    this.userIdSelectRef            = React.createRef();
    this.pictureInputRef            = React.createRef();
    this.pictureFileRef             = React.createRef();
    this.pictureUploadButtonRef     = React.createRef();
    this.pictureWebcamButtonRef     = React.createRef();
    this.pictureWebcamModalRef      = React.createRef();
    this.nameInputRef               = React.createRef();
    this.genderSelectRef            = React.createRef();
    this.maritalStatusSelectRef     = React.createRef();
    this.dateOfBirthInputRef        = React.createRef();
    this.occupationInputRef         = React.createRef();
    this.cpfInputRef                = React.createRef();
    this.rgInputRef                 = React.createRef();
    this.rgIssuingAgencyInputRef    = React.createRef();
    this.nationalitySelectRef       = React.createRef();
    this.nationalityOtherInputRef   = React.createRef();
    this.placeOfBirthSelectRef      = React.createRef();
    this.placeOfBirthOtherInputRef  = React.createRef();

    this.landlineInputRef           = React.createRef();
    this.cellPhoneInputRef          = React.createRef();
    this.workPhoneInputRef          = React.createRef();
    this.emailInputRef              = React.createRef();

    this.cepInputRef                = React.createRef();
    this.stateSelectRef             = React.createRef();
    this.cityInputRef               = React.createRef();
    this.neighborhoodInputRef       = React.createRef();
    this.addressInputRef            = React.createRef();
    this.complementInputRef         = React.createRef();

    this.userIdSelectLoaded         = false;
    this.pictureUploadTooltipLoaded = false;
    this.pictureWebcamTooltipLoaded = false;
    this.pictureWebcamModalLoaded   = false;
    this.genderSelectLoaded         = false;
    this.maritalStatusSelectLoaded  = false;
    this.nationalitySelectLoaded    = false;
    this.placeOfBirthSelectLoaded   = false;
    this.stateSelectLoaded          = false;
    this.countersLoaded             = false;

    this.datepicker                 = null;
  }

  componentDidMount() {
    this.initFormMasks();
  }

  componentDidUpdate() {
    this.initFormCounters();
    this.initFormSelects();
    this.initTooltips();
    this.initModals();
    M.updateTextFields();
    this.updateFields();

    if (
      this.state.shouldResetSelects ||
      this.state.shouldResetCounters ||
      this.state.shouldResetTooltips
    ) {
      this.setState({
        shouldResetSelects: false,
        shouldResetCounters: false,
        shouldResetTooltips: false
      });
    }
  }

  onDatepickerOpen() {
    this.fixDateDisplay();
    this.fixYearsSelect();
  }

  onDatepickerSelect() {
    this.onDatepickerClose();
  }

  onDatepickerDraw() {
    this.fixDateDisplay();
    this.fixYearsSelect();
  }

  onDatepickerClose() {
    if (this.datepicker) {
      this.datepicker.destroy();
      this.datepicker = null;
    }
  }

  onDateOfBirthFieldFocus() {
    this.onDatepickerClose();
  }

  onNationalityChange({ target: { options } }) {
    if (options[options.selectedIndex].value === Patient.NATIONALITY_VALUES[Patient.NATIONALITY_VALUES.length - 1] && this.state.showNationalityOther === false) {
      this.setState({ showNationalityOther: true });
    } else if (options[options.selectedIndex].value !== Patient.NATIONALITY_VALUES[Patient.NATIONALITY_VALUES.length - 1] && this.state.showNationalityOther === true) {
      this.props.change('nationality_other', '');
      this.props.untouch('nationality_other');
      this.setState({ showNationalityOther: false });
    }
  }

  onPlaceOfBirthChange({ target: { options } }) {
    if (options[options.selectedIndex].value === Patient.STATE_VALUES[Patient.STATE_VALUES.length - 1] && this.state.showPlaceOfBirthOther === false) {
      this.setState({ showPlaceOfBirthOther: true });
    } else if (options[options.selectedIndex].value !== Patient.STATE_VALUES[Patient.STATE_VALUES.length - 1] && this.state.showPlaceOfBirthOther === true) {
      this.props.change('place_of_birth_other', '');
      this.props.untouch('place_of_birth_other');
      this.setState({ showPlaceOfBirthOther: false });
    }
  }

  onRgChange({ target: { value } }) {
    if (value && this.state.showRgIssuingAgency === false) {
      this.setState({ showRgIssuingAgency: true });
    } else if (!value && this.state.showRgIssuingAgency === true) {
      this.props.change('rg_issuing_agency', '');
      this.props.untouch('rg_issuing_agency');
      this.setState({ showRgIssuingAgency: false });
    }
  }

  onCepChange({ target: { value } }) {
    if (value.match(Regex.CEP)) {
      this.disableAddressFields();

      cepSearch(value)
        .then(({ data }) => {
          if (data.erro) {
            throw(new Error('CEP not found'));
          }

          const { bairro, localidade, logradouro, uf } = data;
          const state = Patient.getStateValueFromInitials(uf);

          this.props.change('state', state);
          this.props.change('city', localidade);
          this.props.change('neighborhood', bairro);
          this.props.change('address', logradouro);
        })
        .catch(error => {
          this.props.change('state', '');
          this.props.untouch('state');
          this.props.change('city', '');
          this.props.untouch('city');
          this.props.change('neighborhood', '');
          this.props.untouch('neighborhood');
          this.props.change('address', '');
          this.props.untouch('address');
        })
        .then(() => {
          this.enableAddressFields();
        });
    }
  }

  onRestoreButtonClick(callback) {
    callback();
    this.setState({ shouldResetSelects: true, shouldResetCounters: true });
  }

  onUploadButtonClick() {
    this.pictureFileRef.current.click();
  }

  onWebcamButtonClick() {
    this.openWebcamModal();
  }

  onPictureError({ target }) {
    target.src = '/images/empty_picture.png';
  }

  onPictureSelect({ target: { files: [file] } }) {
    if (file) {
      const { id, authenticityToken } = this.props;

      this.disablePictureField();

      uploadPatientPicture(file, id, authenticityToken)
        .then(({ status, data: { success, url, errors } }) => {
          if (status === 200 && success) {
            this.props.change('picture', url);
          } else {
            this.props.change('picture', '');
            alert(errors.picture);
          }
        })
        .then(() => {
          this.enablePictureField();
          this.setState({ shouldReinitialize: true });
        });
    }
  }

  initFormCounters() {
    const { countersLoaded }      = this;
    const { shouldResetCounters } = this.state;

    if (shouldResetCounters || !countersLoaded) {
      const elements = [
        this.nameInputRef.current,
        this.occupationInputRef.current,
        this.rgInputRef.current,
        this.rgIssuingAgencyInputRef.current,
        this.nationalityOtherInputRef.current,
        this.placeOfBirthOtherInputRef.current,
        this.emailInputRef.current,
        this.cityInputRef.current,
        this.neighborhoodInputRef.current,
        this.addressInputRef.current,
        this.complementInputRef.current
      ];

      elements.forEach(element => {
        if (element) {
          M.CharacterCounter.init(element);
        }
      });

      this.countersLoaded = true;
    }
  }

  initFormMasks() {
    const elements = [
      {
        element: this.dateOfBirthInputRef.current,
        mask:    '99/99/9999'
      }, {
        element: this.cpfInputRef.current,
        mask:    '999.999.999-99'
      }, {
        element: this.landlineInputRef.current,
        mask:    ['(99) 9999-9999', '(99) 99999-9999']
      }, {
        element: this.cellPhoneInputRef.current,
        mask:    ['(99) 9999-9999', '(99) 99999-9999']
      }, {
        element: this.workPhoneInputRef.current,
        mask:    ['(99) 9999-9999', '(99) 99999-9999']
      }, {
        element: this.cepInputRef.current,
        mask:    '99999-999'
      }
    ];

    elements.forEach(element => {
      if (element.element) {
        Inputmask({
          mask: element.mask,
          showMaskOnHover: false
        }).mask(element.element);
      }
    });
  }

  initDatepicker() {
    const { dateOfBirthInputRef } = this;

    if (dateOfBirthInputRef.current) {
      const [ day, month, year ] = dateOfBirthInputRef.current.value.split('/');

      dateOfBirthInputRef.current.value = `${month}/${day}/${year}`;

      this.datepicker = M.Datepicker.init(dateOfBirthInputRef.current, {
        autoClose: true,
        format: 'dd/mm/yyyy',
        setDefaultDate: true,
        minDate: new Date(new Date().getFullYear() - 150, 1, 1),
        maxDate: new Date(),
        yearRange: [new Date().getFullYear() - 150, new Date().getFullYear()],
        i18n: Datepicker.language(),
        container: document.getElementsByClassName('page-modal-container')[0],
        onOpen: this.onDatepickerOpen.bind(this),
        onSelect: this.onDatepickerSelect.bind(this),
        onDraw: this.onDatepickerDraw.bind(this),
        onClose: this.onDatepickerClose.bind(this)
      });

      this.datepicker.open();
    }
  }

  initFormSelects() {
    const { userIdSelectLoaded, genderSelectLoaded }             = this;
    const { maritalStatusSelectLoaded, nationalitySelectLoaded } = this;
    const { placeOfBirthSelectLoaded, stateSelectLoaded }        = this;
    const { userIdSelectRef, genderSelectRef }                   = this;
    const { maritalStatusSelectRef, nationalitySelectRef }       = this;
    const { placeOfBirthSelectRef, stateSelectRef }              = this;
    const { shouldResetSelects }                                 = this.state;

    if ((shouldResetSelects || !userIdSelectLoaded) && userIdSelectRef.current) {
      M.FormSelect.init(userIdSelectRef.current);
      this.userIdSelectLoaded = true;
    }

    if ((shouldResetSelects || !genderSelectLoaded) && genderSelectRef.current) {
      M.FormSelect.init(genderSelectRef.current);
      this.genderSelectLoaded = true;
    }

    if ((shouldResetSelects || !maritalStatusSelectLoaded) && maritalStatusSelectRef.current) {
      M.FormSelect.init(maritalStatusSelectRef.current);
      this.maritalStatusSelectLoaded = true;
    }

    if ((shouldResetSelects || !nationalitySelectLoaded) && nationalitySelectRef.current) {
      M.FormSelect.init(nationalitySelectRef.current);
      this.nationalitySelectLoaded = true;
    }

    if ((shouldResetSelects || !placeOfBirthSelectLoaded) && placeOfBirthSelectRef.current) {
      M.FormSelect.init(placeOfBirthSelectRef.current);
      this.placeOfBirthSelectLoaded = true;
    }

    if ((shouldResetSelects || !stateSelectLoaded) && stateSelectRef.current) {
      M.FormSelect.init(stateSelectRef.current);
      this.stateSelectLoaded = true;
    }
  }

  initTooltips() {
    const { pictureUploadButtonRef, pictureWebcamButtonRef }         = this;
    const { pictureUploadTooltipLoaded, pictureWebcamTooltipLoaded } = this;
    const { shouldResetTooltips } = this.state;

    if ((shouldResetTooltips || !pictureUploadTooltipLoaded) && pictureUploadButtonRef.current) {
      M.Tooltip.init(pictureUploadButtonRef.current);
      this.pictureUploadTooltipLoaded = true;
    }

    if ((shouldResetTooltips || !pictureWebcamTooltipLoaded) && pictureWebcamButtonRef.current) {
      M.Tooltip.init(pictureWebcamButtonRef.current);
      this.pictureWebcamTooltipLoaded = true;
    }
  }

  initModals() {
    const { pictureWebcamModalRef, pictureWebcamModalLoaded } = this;
    const { shouldResetModals }                               = this.state;

    if ((shouldResetModals || !pictureWebcamModalLoaded) && pictureWebcamModalRef.current) {

      M.Modal.init(pictureWebcamModalRef.current);
      this.pictureWebcamModalLoaded = true;
    }
  }

  updateFields() {
    this.onRgChange({ target: { value: this.rgInputRef.current.value } });
    this.onNationalityChange({ target: { options: this.nationalitySelectRef.current.options } });
    this.onPlaceOfBirthChange({ target: { options: this.placeOfBirthSelectRef.current.options } });
  }

  fixDateDisplay() {
    const element = document.querySelector('.datepicker-date-display .date-text');

    if (element) {
      let [ , date ] = element.innerHTML.split(',');

      if (date) {
        let [ first, second ] = date.split(' ').filter(part => !!part);

        if (parseInt(second)) {
          first = Datepicker.getMonthFromMonthShort(first);
          element.innerHTML = `${second} de ${first}`;
        }
      }
    }
  }

  fixYearsSelect() {
    const select = window.$('.selects-container .select-year .datepicker-select');

    if (select) {
      let options = select.find('option');
      options = [].slice.call(options).reverse();
      select.empty();

      window.$.each(options, (i, el) => {
        select.append(window.$(el));
      });

      M.FormSelect.init(select);
    }
  }

  disableAddressFields() {
    const { cepInputRef, stateSelectRef, cityInputRef } = this;
    const { neighborhoodInputRef, addressInputRef }     = this;

    cepInputRef.current.disabled          = true;
    stateSelectRef.current.disabled       = true;
    cityInputRef.current.disabled         = true;
    neighborhoodInputRef.current.disabled = true;
    addressInputRef.current.disabled      = true;
    this.setState({ shouldReinitialize: true });
  }

  enableAddressFields() {
    const { cepInputRef, stateSelectRef, cityInputRef } = this;
    const { neighborhoodInputRef, addressInputRef }     = this;

    cepInputRef.current.disabled          = false;
    stateSelectRef.current.disabled       = false;
    cityInputRef.current.disabled         = false;
    neighborhoodInputRef.current.disabled = false;
    addressInputRef.current.disabled      = false;

    this.setState({ shouldReinitialize: true });
  }

  disablePictureField() {
    this.pictureInputRef.current.disabled = true;
    this.pictureFileRef.current.disabled  = true;
  }

  enablePictureField() {
    this.pictureInputRef.current.disabled = false;
    this.pictureFileRef.current.disabled  = false;
  }

  openWebcamModal() {
    const { pictureWebcamModalRef } = this;

    if (pictureWebcamModalRef.current) {
      this.setState({ showWebcam: true });
      // setTimeout(M.Modal.getInstance(pictureWebcamModalRef.current).open(), 10000);
    }
  }

  closeWebcamModal() {
    const { pictureWebcamModalRef } = this;

    if (pictureWebcamModalRef.current) {
      this.setState({ showWebcam: false });
      M.Modal.getInstance(pictureWebcamModalRef.current).close();
    }
  }
}

export default FormPatient;
